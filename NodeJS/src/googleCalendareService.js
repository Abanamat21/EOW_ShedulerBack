import { promises as fs } from 'fs';
import { join } from 'path';
import { cwd } from 'process';
import dateFormat, { masks } from "dateformat";
import gapi from 'gapi-client';

import { authenticate } from '@google-cloud/local-auth';
import { google } from 'googleapis';

import { log } from "./logger.js";
import { allModusls, allSystems } from "./advantureModuls.js";

// Авторизация по API_KEY
const EMAIL_KEY = 'eow-serviceaccount@testproject-314605.iam.gserviceaccount.com';
const API_KEY = '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDjo2ltt8w6HW7n\nBomHLl+3rsyfracOG4yHXwleY+LAEsnhsBDiyP+4vHXHgisx0xT1CIkbqFjVuDEm\nGSY9l36ezqvDPjx+pOp6AmWEiL7DxuLSH4mWS+TOAay1oJ5d5hY/+vqb23gaoOkZ\nQ6lcBiNN4kdY722aRxUBZxP5IBjgPbCC3DPmK+PePMFK3bexEWrnI8HwXM7T85cf\nHUu79q7b3ihC+N33EsmKblw6T0keBxIShD1tbZ8I+QyIYzT9AExk9IWkwYbR8eT9\nAX5iLB7NIfzxTrzCi+I+Pxyr0cjdTFt7CkChuwMY79DIvEmafmqE/aWl8hni2cwa\n6PPbn6PFAgMBAAECggEAJn9u55bTa6qppFmXLaz6lBp0UbbxDzI6iHRapcN3yCsF\nSG1Z1bjPgqMguh56BqGfpDcO1QYaC/7sFPjg3j6+M8ZZBxqB6ZsjaoH4QDtOI9cB\nai7aOnhYWDyxREBHODMe5TAhbPVncP1wnoyyWjVRiCzyCwjm/NXzp/qSRqoWeumy\nQ+BO2s7cuFmQRjE0O4gqCi1F/5eiHJFtpImOQX0WlaEyTzJ+eDzfpKAkXW5Q2YUT\nqOUsLx/iWyFRw+8bwqb681JKZl2FpanlghL9f5xZpg/gI59yDBmnfxIaawkSiBdH\ncKceSiX3OHPepgfoIyf4FZj0XAHBlPziFE4xrpkJsQKBgQD1eB5TxVQoEig7l/ju\nNlJ9u6VWhZ5rA4Vqf7ckdw/bDqHTgX/bgPzpAVsNy396ZV0/VjkEpQaEgpn+WhvG\nCC9BAxBXXGkHIC6SJBsq3aVMhweAJcLBc1svqMB+h++3HNzgr8EG7GhSYjyWtJmv\ndh4SVAqsIDaYyj3scZBHhQlB7QKBgQDtZ3bqOxCWURdt/rYe1420SODGm8yutuI7\n3iN25Xp211iIzuWWLOHCtIbOHRPSptV5HkbgrreEhL0oFxeYHxRKR/tmbcPpt/yZ\n6DaccgR/9+IxyU3tNRLvMqiWAbXwsg/MSITOdf7fdAEY76nArbvuge19dKM//ZAI\n4tFkXCkOOQKBgGc47s/dUAlVsVN2EbjiYQf8a4eZwsdPgMALGtGbu7ArVAOkFkcQ\n08mLx2ViqKWokHC86lc4qif435bk/37kHDLjffCurH/RmaPcyQvajtNCiPXrax18\nS+Ebvm627Sf8XCmj3rDxouDZ7I6XPXVaX0Tn0GEXXr4bdbTDAKACoqT1AoGAblYG\n64f2Bpa7t/CIvj7aai7w4P2qHI19CewNOYYf67ncOQFHrQtBBdgXSxYyj1Xgo0ES\nGfy56Eo1C7vnyFixenCIBCwBwM81BGbrcrx/IOaZZyAzKorfOPKnbchvweVP+Fa/\n+qDWiw4EMI26rIVSceBK+2LJOMVlOuwH+4flwOkCgYEAv/tZ/QdQUz9qw411tNx3\nWuHSxnFep5hHoXTvi2EyvDZ3oYPhF0Ms5b/wiO9cBrVP5CrCnfbTyPMASjBsRVqZ\n/vulLjx/bbDuagDIyaJqAQz140s/7x8IkPomGLBj059uHxCLPya/3vcWVBdOXom1\nL0Juj2s/EZEtOt8zPbfBfv0=\n-----END PRIVATE KEY-----\n';

// Авторизаяция по файлу
const TOKEN_PATH = join(cwd(), 'token.json');
const CREDENTIALS_PATH = join(cwd(), 'credentials.json');

const SCOPES = 'https://www.googleapis.com/auth/calendar.readonly';
const CALENDARID = 'bn0trnr1598i0m2j67h3qs5kh0@group.calendar.google.com';

const DEFAULTCOLOR = '#000000';
const DEFAULTICONPATH = 'content/img/icons/dnd.png';
const WEEKDAYS = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
const DAYCOUNT = 14;

async function getGroupedEvents() {
  const auth = await webApiAuthorize();
  const service = google.calendar(
    {
      version: 'v3', 
      project: 521376882978,
      auth: auth
    });
  const events = await getEvents(service);
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
      const dayDate = dateFormat(day.date, 'yyyy.mm.dd');
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
async function getEvents(service) {
  var startTome = new Date();
  startTome.setUTCHours(0,0,0,0);
  const apiEventsResult = await service.events.list({
    calendarId: 'primary',
    timeMin: startTome.toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime',
    calendarId: CALENDARID
  });
  const colors = await getColors(service);

  const apiEvents = apiEventsResult.data.items;
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
      new Date(apiEvent.start.dateTime),
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

/**
 * Получить список цветов гугла
 */
async function getColors(service) {
  const apiResult = await service.colors.get();
  return apiResult.data.event;
}

/**
 * Reads previously authorized credentials from the save file.
 *
 * @return {Promise<OAuth2Client|null>}
 */
 async function loadSavedCredentialsIfExist() {
  try {
    const content = await fs.readFile(TOKEN_PATH);
    const credentials = JSON.parse(content);
    return google.auth.fromJSON(credentials);
  } catch (err) {
    return null;
  }
}

/**
 * Serializes credentials to a file comptible with GoogleAUth.fromJSON.
 *
 * @param {OAuth2Client} client
 * @return {Promise<void>}
 */
async function saveCredentials(client) {
  const content = await fs.readFile(CREDENTIALS_PATH);
  const keys = JSON.parse(content);
  const key = keys.installed || keys.web;
  const payload = JSON.stringify({
    type: 'authorized_user',
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  });
  await fs.writeFile(TOKEN_PATH, payload);
}

/**
 * Авторизация для десктопного приложения по файлу credentials.json
 */
async function desktopAuthorize() {
  let client = await loadSavedCredentialsIfExist();
  if (client) {
    return client;
  }
  client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  });
  if (client.credentials) {
    await saveCredentials(client);
  }
  return client;
}

/**
 * Авторизация для веб-приложения по API ключу
 */
async function webApiAuthorize() {
  const jwtClient = new google.auth.JWT(
    EMAIL_KEY,
    null,
    API_KEY,
    SCOPES
  );
  await jwtClient.authorize();
  return jwtClient;
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

  