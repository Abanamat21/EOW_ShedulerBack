from __future__ import print_function

import datetime
import os.path
import json
import copy

import src.logger as logger
import src.advantureModuls as advantureModuls

from dateutil import parser
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

SCOPES = ['https://www.googleapis.com/auth/calendar.readonly']
CALENDAR = 'bn0trnr1598i0m2j67h3qs5kh0@group.calendar.google.com'
DEFAULTCOLOR = '#fa573c'
WEEKDAYS = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье']

# Возвращает список дней начиная с сегодняшнего дня, в каждом дне список событий, заплонированных на этот день.
def getGroupedEvents():
    service = getService()
    events = getEvents(service)
    groupedEvents = groupEventsByDays(events)
    # logger.log(json.dumps(groupedEvents))
    # logger.log(groupedEvents.toJSON())
    return groupedEvents


# Группирует список событий по дням
def groupEventsByDays(events):
    days = []
    for event in events:
        eventWasAdded = False
        for day in days:
            if (day.date == event.startDT.date()):
                order = len(day.events)
                day.events.append(EventViewModel(event, order))
                eventWasAdded = True
                break

        if (eventWasAdded): continue

        date = event.startDT.date()
        weekDayNum = date.weekday()
        weekDayName = WEEKDAYS[weekDayNum]
        days.append(DayViewModel(date, weekDayNum,  weekDayName, [EventViewModel(event, 0)]))

    return days

# Получить из Гугла список событий
def getEvents(service):   

    colors = getColors(service)
    # logger.log('colors = ' + json.dumps(colors))

    calendar = getCalendar(service)
    calendarColor = calendar.get('backgroundColor', None)
    # logger.log('calendar = ' + json.dumps(calendar))

    now = datetime.datetime.utcnow().isoformat() + 'Z'  # 'Z' indicates UTC time
    apiEventsResult = service.events().list(
        calendarId = calendar['id'], 
        timeMin = now,
        maxResults = 10, 
        singleEvents = True,
        orderBy = 'startTime').execute()

    apiEvents = apiEventsResult.get('items', [])

    vmEvents = []

    for apiEvent in apiEvents:
        
        modul = defineModul(apiEvent)

        # Определяем основной цвет
        eventColor = apiEvent.get('colorId', -1)
        if (eventColor != -1):                  color = colors[eventColor].get('background', None)
        elif modul.color is not None:           color = modul.color
        elif modul.system.color is not None:    color = modul.system.color
        elif calendarColor is not None:         color = calendarColor
        else:                                   color = DEFAULTCOLOR

        # Определяем картинку
        if (modul.iconPath is not None):            iconPath = modul.iconPath
        elif (modul.system.iconPath is not None):   iconPath = modul.system.iconPath

        vmEvent = EventModel(
            startDT = parser.parse(apiEvent['start'].get('dateTime', None)),
            description = apiEvent.get('description', None),
            name = apiEvent['summary'],
            modulName = modul.name,
            systemName = modul.system.name,
            color = color,
            iconPath = iconPath,
        )
        vmEvents.append(vmEvent)

    # logger.log(json.dumps(apiEvents))
    # logger.log(json.dumps(vmEvents))
    return vmEvents

# Получить из Гугла клендарь, с которым следует работать
def getCalendar(service):
    calendars_result = service.calendarList().list().execute()

    calendars = calendars_result.get('items', [])

    if not calendars:
       logger.log('Список календарей пуст')
    # logger.log (json.dumps(calendars))
    for calendar in calendars:
        if (calendar['id'] == CALENDAR):
            return calendar
    
    logger.log('Не найден календарь с ИД = {}'.format(CALENDAR))

    return None

# Получить из Гугла список цветов
def getColors(service):
    colors_result = service.colors().get().execute()
    colors = colors_result.get('event', [])
    return colors

# По событию определить его модуль и систему
def defineModul(apiEvent):
    moduls = advantureModuls.MODULS
    systems = advantureModuls.SYSTEMS

    description = apiEvent.get('description', None)
    title = apiEvent.get('summary', None)

    retModul = None

    logger.log('Начнем изучать ивент ' + title + ' с описнием ' + (description if description is not None else ''))

    # Ищим модуль. Должно сработать.
    for modul in moduls:
        if (retModul is not None): break
        if (hasattr(modul, 'keyWords') and modul.keyWords is not None):
            for word in modul.keyWords:
                if (description is not None and word.lower() in description.lower()):
                    logger.log('Нашли модуль по описания: ' + modul.name)
                    retModul = copy.copy(modul)
                    break
                if (title is not None and word.lower() in title.lower()):
                    logger.log('Нашли модуль по названию: ' + modul.name)
                    retModul = copy.copy(modul)
                    break

    # Добавляем ссылку на систему в модуль
    if (retModul is not None):
        for system in systems:
            if (retModul.systemId == system.id):
                logger.log('Нашли систему по ID: ' + system.name)
                retModul.system = copy.copy(system)
                break

    # Если случилось странное и модуль найти не получилось то:
    if (retModul is None): 
        # Ставим дефолтный
        for modul in moduls:
            if (modul.name == '__default'):
                logger.log('Взяли дефолтный модуль: ' + modul.name)
                retModul = copy.copy(modul)
                break
        retSystem = None
        # И ищем систему
        for system in systems:
            if (retSystem is not None): break
            if (hasattr(system, 'keyWords') and system.keyWords is not None):
                for word in system.keyWords:
                    if (description is not None and word.lower() in description.lower()):
                        logger.log('Нашли систему по описанию: ' + system.name)
                        retSystem = copy.copy(system)
                        break
                    if (title is not None and word.lower() in title.lower()):
                        logger.log('Нашли систему по названию: ' + system.name)
                        retSystem = copy.copy(system)
                        break
        retModul.system = retSystem

    # Если произошла неведомая хуйня и до сих пор не удалось найти систему, считаем, что это ДнД (id = 1)
    if (retModul.system is None): 
        for system in systems:
            if (system.id == 1):
                logger.log('Произошла неведомая хуйня, ставим дефолтную систему: ' + system.name)
                retModul.system = copy.copy(system)
                break

    if (retModul.name == '__default'):
        retModul.name = retModul.system.name

    # logger.log('Весь полученный модуль: ' + retModul.toJSON())
    return retModul

# Пройти авторизацию в Гугле и получить объект службы календарей, который необходим в дальнейшей работе
def getService():
    creds = None
    # The file token.json stores the user's access and refresh tokens, and is
    # created automatically when the authorization flow completes for the first
    # time.
    if os.path.exists('token.json'):
        creds = Credentials.from_authorized_user_file('token.json', SCOPES)
    # If there are no (valid) credentials available, let the user log in.
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(
                'credentials.json', SCOPES)
            creds = flow.run_local_server(port=0)
        # Save the credentials for the next run
        with open('token.json', 'w') as token:
            token.write(creds.to_json())

    try:
        service = build('calendar', 'v3', credentials=creds)
        return service

    except HttpError as error:
        logger.log('Ошибка в процессе получения API службы: {}'.format(error))

# Модель дня в календаре для отображения
class DayViewModel:
  def __init__(self, date, weekDayNum,  weekDayName, events):
    self.date = date
    self.weekDayNum = weekDayNum
    self.weekDayName = weekDayName
    self.events = events

    def toJSON(self):
        return json.dumps(self, default=lambda o: o.__dict__, sort_keys=True, indent=4)

# Модель события для отображения
class EventViewModel:
  def __init__(self, eventModel,  order):
    self.startTime = eventModel.startDT.time()
    self.name = eventModel.name
    self.description = eventModel.description
    self.modulName = eventModel.modulName
    self.systemName = eventModel.systemName
    self.iconPath = eventModel.iconPath
    self.color = eventModel.color
    self.order = order

    def toJSON(self):
        return json.dumps(self, default=lambda o: o.__dict__, sort_keys=True, indent=4)

# Модель события, полученная из данных Гугл события
class EventModel:
  def __init__(self, startDT, name, description, modulName, systemName, iconPath, color):
    self.startDT = startDT
    self.name = name
    self.description = description
    self.modulName = modulName
    self.systemName = systemName
    self.iconPath = iconPath
    self.color = color

    def toJSON(self):
        return json.dumps(self, default=lambda o: o.__dict__, sort_keys=True, indent=4)

