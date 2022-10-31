# EOW_ShedulerBack

Задача проекта смотреть в google календарь Граней Миров и формировать json ближайших событий.

Задача была решена 3-мя способами. В приложениях `Python`, `NodeJS` и `React`.

Каждое запускается по своему. На данный момент наиболее актуальная версия в `React` приложении

### Пример работы:

```

[
  {
    "date": "2022.11.01",
    "weekDayNum": 2,
    "weekDayName": "Вторник",
    "events": [
      {
        "startTime": "19:00",
        "name": "Дом Смерти",
        "modulName": "Dungeons and Dragons e5",
        "systemName": "Dungeons and Dragons e5",
        "iconPath": "content/img/icons/dnd.png",
        "color": "#000000",
        "order": 0
      }
    ]
  },
  {
    "date": "2022.11.02",
    "weekDayNum": 3,
    "weekDayName": "Среда",
    "events": [
      {
        "startTime": "19:00",
        "name": "Из Бездны",
        "modulName": "Из Бездны",
        "systemName": "Dungeons and Dragons e5",
        "iconPath": "content/img/icons/abyss.png",
        "color": "#8e24aa",
        "order": 0
      },
      {
        "startTime": "19:00",
        "name": "Вестерн от Никиты",
        "modulName": "Dungeons and Dragons e5",
        "systemName": "Dungeons and Dragons e5",
        "iconPath": "content/img/icons/dnd.png",
        "color": "#000000",
        "order": 1
      }
    ]
  },
  {
    "date": "2022.11.03",
    "weekDayNum": 4,
    "weekDayName": "Четверг",
    "events": [
      {
        "startTime": "19:00",
        "name": "Драконий Куш (Первая группа)",
        "modulName": "Dungeons and Dragons e5",
        "systemName": "Dungeons and Dragons e5",
        "iconPath": "content/img/icons/dnd.png",
        "color": "#000000",
        "order": 0
      }
    ]
  },
  {
    "date": "2022.11.04",
    "weekDayNum": 5,
    "weekDayName": "Пятница",
    "events": [
      {
        "startTime": "19:00",
        "name": "Гильди Героев (Герои Подруги)",
        "modulName": "Dungeons and Dragons e5",
        "systemName": "Dungeons and Dragons e5",
        "iconPath": "content/img/icons/dnd.png",
        "color": "#000000",
        "order": 0
      },
      {
        "startTime": "19:00",
        "name": "Warhammer Only War (лайт едишн)",
        "modulName": "Warhammer",
        "systemName": "Warhammer",
        "iconPath": "content/img/icons/warhammer.png",
        "color": "#0e4901",
        "order": 1
      }
    ]
  },
  {
    "date": "2022.11.05",
    "weekDayNum": 6,
    "weekDayName": "Суббота",
    "events": [
      {
        "startTime": "08:00",
        "name": "Mork Borg",
        "modulName": "Dungeons and Dragons e5",
        "systemName": "Dungeons and Dragons e5",
        "iconPath": "content/img/icons/dnd.png",
        "color": "#000000",
        "order": 0
      },
      {
        "startTime": "11:00",
        "name": "Туманы Рейвенлофта",
        "modulName": "Туманы Рейвенлофта",
        "systemName": "Dungeons and Dragons e5",
        "iconPath": "content/img/icons/dnd.png",
        "color": "#920101",
        "order": 1
      },
      {
        "startTime": "16:00",
        "name": "Туманы Рейвенлофта",
        "modulName": "Туманы Рейвенлофта",
        "systemName": "Dungeons and Dragons e5",
        "iconPath": "content/img/icons/dnd.png",
        "color": "#920101",
        "order": 2
      }
    ]
  },
  {
    "date": "2022.11.06",
    "weekDayNum": 0,
    "weekDayName": "Воскресенье",
    "events": []
  },
  {
    "date": "2022.11.07",
    "weekDayNum": 1,
    "weekDayName": "Понедельник",
    "events": []
  },
  {
    "date": "2022.11.08",
    "weekDayNum": 2,
    "weekDayName": "Вторник",
    "events": []
  },
  {
    "date": "2022.11.09",
    "weekDayNum": 3,
    "weekDayName": "Среда",
    "events": []
  },
  {
    "date": "2022.11.10",
    "weekDayNum": 4,
    "weekDayName": "Четверг",
    "events": [
      {
        "startTime": "19:00",
        "name": "Гильди Героев (Герои Подруги)",
        "modulName": "Dungeons and Dragons e5",
        "systemName": "Dungeons and Dragons e5",
        "iconPath": "content/img/icons/dnd.png",
        "color": "#000000",
        "order": 0
      }
    ]
  },
  {
    "date": "2022.11.11",
    "weekDayNum": 5,
    "weekDayName": "Пятница",
    "events": []
  },
  {
    "date": "2022.11.12",
    "weekDayNum": 6,
    "weekDayName": "Суббота",
    "events": []
  },
  {
    "date": "2022.11.13",
    "weekDayNum": 0,
    "weekDayName": "Воскресенье",
    "events": []
  },
  {
    "date": "2022.11.14",
    "weekDayNum": 1,
    "weekDayName": "Понедельник",
    "events": []
  }
]

```
