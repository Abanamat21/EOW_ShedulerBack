import { promises as fs } from 'fs';
import { join } from 'path';
import { cwd } from 'process';
import dateFormat, { masks } from "dateformat";
// import gapi from 'gapi-client';

// import { authenticate } from '@google-cloud/local-auth';
// import { google } from 'googleapis';

import { log } from "./logger.js";
import { allModusls, allSystems } from "./advantureModuls.js";

// Авторизация по API_KEY
const API_KEY = 'AIzaSyAYbnPQEY7b93FYcihBx0zzYz2g0G3D3Mo'

const SCOPES = 'https://www.googleapis.com/auth/calendar.readonly';
const CALENDARID = 'bn0trnr1598i0m2j67h3qs5kh0@group.calendar.google.com';

const DEFAULTCOLOR = '#000000';
const DEFAULTICONPATH = 'content/img/icons/dnd.png';
const WEEKDAYS = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
const DAYCOUNT = 14;

async function getGroupedEvents() {
  const events = await getEvents();
  const groupedEvents = await groupEventsByDays(events);
  return groupedEvents;
}

export { getGroupedEvents };

/**
 * Возвращает список дней начиная с сегодняшнего дня, в каждом дне список событий, заплонированных на этот день.
 */
async function groupEventsByDays(events) {
  const days = [];
  const today = new Date();
  for (let i = 0; i < DAYCOUNT; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() + i);
    const weekDayNum = date.getDay();
    const weekDayName = WEEKDAYS[weekDayNum];
    days.push(new DayViewModel(dateFormat(date, 'yyyy.mm.dd'), weekDayNum,  weekDayName, []))
  }

  events.forEach(event => {
    for (const dayIndex in days) {
      const day = days[dayIndex];
      const dayDate = day.date;
      const eventDate = dateFormat(event.startDT, 'yyyy.mm.dd');
      if (dayDate === eventDate) { 
        const order = day.events.length;
        day.events.push(new EventViewModel(event, order))
        break
      }
    }
  });

  return days
}

/**
 * Получить из Гугла список событий
 */
async function getEvents() {

  const apiEvents = await apiGetEvents();
  const colors = await apiGetColors();

  let vmEvents = [];
  apiEvents.forEach(apiEvent => {
    const modul = defineModul(apiEvent);

    let color = DEFAULTCOLOR;
    let iconPath = DEFAULTICONPATH;

    // Определяем основной цвет
    const eventColor =  apiEvent.colorId;
    if (eventColor)                 color = colors[eventColor].background;
    else if (modul.color)           color = modul.color
    else if (modul.system.color)    color = modul.system.color
    // else if (calendarColor)         color = calendarColor  

    // Определяем картинку
    if (modul.iconPath)               iconPath = modul.iconPath
    else if (modul.system.iconPath)   iconPath = modul.system.iconPath

    const vmEvent = new EventModel (
      new Date(apiEvent.start.dateTime ? apiEvent.start.dateTime : apiEvent.start.date),
      apiEvent.summary, 
      apiEvent.description, 
      modul.name, 
      modul.system.name, 
      iconPath, 
      color)
    vmEvents.push(vmEvent);
  });
  return vmEvents;
}

/**
 * По событию определить его модуль и систему
 */
function defineModul(apiEvent) {
  const moduls = allModusls();
  const systems = allSystems();

  const description = apiEvent.description;
  const title = apiEvent.summary;

  let retModul = undefined;
  let retSystem = undefined;

  log(`Начнем изучать ивент ${title} с описнием ${description}`);

  // Ищим модуль. Должно сработать.
  for (const modulIndex in moduls) {
    const modul = moduls[modulIndex];
    if (retModul) break;
    if (modul.keyWords) {
      // TODO: на линку бы это
      for (const wordIndex in modul.keyWords) {
        const word = modul.keyWords[wordIndex];
        if (description && description.toLowerCase().includes(word.toLowerCase())) {
          log(`Нашли модуль по описанию: ${modul.name} (${description})`);
          retModul = JSON.parse(JSON.stringify(modul));
          break;
        }
        if (title && title.toLowerCase().includes(word.toLowerCase())) {
          log(`Нашли модуль по названию: ${modul.name}`);
          retModul = JSON.parse(JSON.stringify(modul));
          break;
        }
      }
    }
  }

  // Добавляем ссылку на систему в модуль
  if (retModul) {
    const system = systems.find(s => retModul.systemId === s.id);
    if (system) {
      log(`Нашли систему по ID: ${system.name}`);
      retModul.system = JSON.parse(JSON.stringify(system));
    }
  }

  // Если случилось странное и модуль найти не получилось то:
  if (!retModul) {
    // Ставим дефолтный
    const defaultModul = moduls.find(m => m.name === '__default');
    if (defaultModul) {
      log(`Взяли дефолтный модуль: ${defaultModul.name}`);
      retModul = JSON.parse(JSON.stringify(defaultModul));
    } else {
      log(`ЭЙ! дефолтного модуля нет в конфиге! А ну срываемся и исправляем это!`);
    }

    // И ищем  систему
    for (const systemIndex in systems) {
      const system = systems[systemIndex];
      if (retSystem) break;
      if (system.keyWords) {
        // TODO: на линку бы это
        for (const wordIndex in system.keyWords) {
          const word = system.keyWords[wordIndex];
          if (description && description.toLowerCase().includes(word.toLowerCase())) {
            log(`Нашли систему по описанию: ${system.name} (${description})`);
            retSystem = JSON.parse(JSON.stringify(system));
            break;
          }
          if (title && title.toLowerCase().includes(word.toLowerCase())) {
            log(`Нашли систему по названию: ${system.name}`);
            retSystem = JSON.parse(JSON.stringify(system));
            break;
          }
        }
      }
    }
    retModul.system = retSystem
    
    // Если произошла неведомая хуйня и до сих пор не удалось найти систему, считаем, что это ДнД (id = 1)
    if (!retModul.system) {
      const defaultSystem = systems.find(m => m.id === 1);
      if (defaultSystem) {
        log(`Произошла неведомая хуйня, ставим дефолтную систему: ${defaultSystem.name}`);
        retModul.system = JSON.parse(JSON.stringify(defaultSystem));
      } else {
        log(`ЭЙ! дефолтной системы нет в конфиге! А ну срываемся и исправляем это!`);
      }
    }
    
    if (retModul.name == '__default') {
      retModul.name = retModul.system.name;
    }

    log(`Весь полученный модуль: ${JSON.stringify(retModul)}`);
  }
  return retModul;
}

async function apiGetEvents() {
  var startTime = new Date();
  startTime.setUTCHours(0,0,0,0);

  var endTime = new Date();
  endTime.setDate(endTime.getDate() + 14)
  endTime.setUTCHours(0,0,0,0);


  const url = `https://www.googleapis.com/calendar/v3/calendars/${CALENDARID}/events?`
  const params = new URLSearchParams({
      key: API_KEY,
      timeMin: startTime.toISOString(),
      timeMax: endTime.toISOString(),
      maxResults: 28,
      singleEvents: true,
      orderBy: 'startTime'
    });

  const featchResult = await fetch(
      url + params,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).then((response) => response.json());
  return featchResult.items;
}

/**
 * Получить список цветов гугла
 */
async function apiGetColors() {
  const url = `https://www.googleapis.com/calendar/v3/colors?`
  const params = new URLSearchParams({
      key: API_KEY
    });

  const featchResult = await fetch(
      url + params,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).then((response) => response.json());
  return featchResult;
}

/**
 * Модель дня в календаре для отображения
 */
class DayViewModel {
  constructor(date, weekDayNum,  weekDayName, events) {
    this.date = date
    this.weekDayNum = weekDayNum
    this.weekDayName = weekDayName
    this.events = events
  }
}

/**
 * Модель события для отображения
 */
class EventViewModel {
  constructor(eventModel,  order) {
    this.startTime = dateFormat(eventModel.startDT, 'HH:MM')
    this.name = eventModel.name
    this.description = eventModel.description
    this.modulName = eventModel.modulName
    this.systemName = eventModel.systemName
    this.iconPath = eventModel.iconPath
    this.color = eventModel.color
    this.order = order
  }
}

/**
 * Модель события, полученная из данных Гугл события
 */
class EventModel {
  constructor(startDT, name, description, modulName, systemName, iconPath, color) {
    this.startDT = startDT
    this.name = name
    this.description = description
    this.modulName = modulName
    this.systemName = systemName
    this.iconPath = iconPath
    this.color = color
  }
}

  