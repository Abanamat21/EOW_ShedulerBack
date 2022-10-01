# EOW_ShedulerBack

Задача проекта смотреть в google календарь Граней Миров и формировать json ближайших событий.

Запустить код можно в терминале командой `python main.py`
Основная логика реализована в файле `\src\googleCalendareService.py` 

## googleCalendareService.py

### Методы

#### getGroupedEvents()

Возвращает список дней начиная с сегодняшнего дня, в каждом дне список событий, заплонированных на этот день. Именно этот метод следует вызывать другим модулям

Возвращает список объектов класса `DayViewModel`

Пример:


```

[
  {
    "date": "2022.09.21",
    "weekDayNum": 2,
    "weekDayName": "Среда",
    "events": [
      {
        "startTime": "19:00:00",
        "name": "Из Бездны",
        "description": null,
        "modulName": "Из Бездны",
        "systemName": "Dungeons and Dragons e5",
        "iconPath": "content/img/icons/abyss.png",
        "color": "#e1e1e1",
        "order": 0
      }
    ]
  },
  {
    "date": "2022.09.22",
    "weekDayNum": 3,
    "weekDayName": "Четверг",
    "events": [
      {
        "startTime": "19:00:00",
        "name": "Нисхождение в Авернус ",
        "description": null,
        "modulName": "Нисхождение в Авернус",
        "systemName": "Dungeons and Dragons e5",
        "iconPath": "content/img/icons/avernus.png",
        "color": "#51b749",
        "order": 0
      }
    ]
  },
  {
    "date": "2022.09.23",
    "weekDayNum": 4,
    "weekDayName": "Пятница",
    "events": [
      {
        "startTime": "19:00:00",
        "name": "Тестовый Вархамер",
        "description": null,
        "modulName": "Warhammer",
        "systemName": "Warhammer",
        "iconPath": "content/img/icons/warhammer.png",
        "color": "#0e4901",
        "order": 0
      },
      {
        "startTime": "19:00:00",
        "name": "Тестовый Чужой",
        "description": null,
        "modulName": "Чужой",
        "systemName": "Чужой",
        "iconPath": "content/img/icons/alien.png",
        "color": "#8e24aa",
        "order": 1
      },
      {
        "startTime": "19:00:00",
        "name": "Тестовая Гильдия",
        "description": null,
        "modulName": "Гильдия Героев",
        "systemName": "Dungeons and Dragons e5",
        "iconPath": "content/img/icons/guildOfHeroes.png",
        "color": "#9c9c9c",
        "order": 2
      }
    ]
  },
  {
    "date": "2022.09.23",
    "weekDayNum": 4,
    "weekDayName": "Пятница",
    "events": [
      {
        "startTime": "19:00:00",
        "name": "Тестовый Чужой",
        "description": null,
        "modulName": "Чужой",
        "systemName": "Чужой",
        "iconPath": "content/img/icons/alien.png",
        "color": "#8e24aa",
        "order": 0
      }
    ]
  },
  {
    "date": "2022.09.23",
    "weekDayNum": 4,
    "weekDayName": "Пятница",
    "events": [
      {
        "startTime": "19:00:00",
        "name": "Тестовая Гильдия",
        "description": null,
        "modulName": "Гильдия Героев",
        "systemName": "Dungeons and Dragons e5",
        "iconPath": "content/img/icons/guildOfHeroes.png",
        "color": "#9c9c9c",
        "order": 0
      }
    ]
  },
  {
    "date": "2022.09.24",
    "weekDayNum": 5,
    "weekDayName": "Суббота",
    "events": [
      {
        "startTime": "19:00:00",
        "name": "Тестовая Ктулха",
        "description": "Ктулху",
        "modulName": "Зов Ктулху",
        "systemName": "Зов Ктулху",
        "iconPath": "content/img/icons/cthulhu.png",
        "color": "#0e4901",
        "order": 0
      },
      {
        "startTime": "19:00:00",
        "name": "Тестовая Эноа",
        "description": null,
        "modulName": "Эноа",
        "systemName": "Dungeons and Dragons e5",
        "iconPath": "content/img/icons/enoa.png",
        "color": "#f45329",
        "order": 1
      },
      {
        "startTime": "19:00:00",
        "name": "Тестовая Дюна",
        "description": null,
        "modulName": "Дюна",
        "systemName": "Дюна: Приключения в Империи",
        "iconPath": "content/img/icons/dune.png",
        "color": "#f45329",
        "order": 2
      }
    ]
  },
  {
    "date": "2022.09.24",
    "weekDayNum": 5,
    "weekDayName": "Суббота",
    "events": [
      {
        "startTime": "19:00:00",
        "name": "Тестовая Эноа",
        "description": null,
        "modulName": "Эноа",
        "systemName": "Dungeons and Dragons e5",
        "iconPath": "content/img/icons/enoa.png",
        "color": "#f45329",
        "order": 0
      }
    ]
  },
  {
    "date": "2022.09.24",
    "weekDayNum": 5,
    "weekDayName": "Суббота",
    "events": [
      {
        "startTime": "19:00:00",
        "name": "Тестовая Дюна",
        "description": null,
        "modulName": "Дюна",
        "systemName": "Дюна: Приключения в Империи",
        "iconPath": "content/img/icons/dune.png",
        "color": "#f45329",
        "order": 0
      }
    ]
  },
  {
    "date": "2022.09.25",
    "weekDayNum": 6,
    "weekDayName": "Воскресенье",
    "events": [
      {
        "startTime": "19:00:00",
        "name": "Тестовый Эбберон",
        "description": null,
        "modulName": "Оракул Войны",
        "systemName": "Dungeons and Dragons e5",
        "iconPath": "content/img/icons/eberron.png",
        "color": "#f45329",
        "order": 0
      }
    ]
  }
]

```

