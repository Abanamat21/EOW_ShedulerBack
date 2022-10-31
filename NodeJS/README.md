# EOW_ShedulerBack_NodeJS

Задача проекта смотреть в google календарь Граней Миров и формировать json ближайших событий.

Запустить код можно в терминале командой `node main.js`
Основная логика реализована в файле `\src\googleCalendareService.js` 

## googleCalendareService.js

### Методы

#### getGroupedEvents()

Возвращает список дней начиная с сегодняшнего дня, в каждом дне список событий, заплонированных на этот день. Именно этот метод следует вызывать другим модулям

Возвращает список объектов класса `DayViewModel`

Пример:


```

[
    {
        "date": "2022.10.01",
        "weekDayNum": 5,
        "weekDayName": "\u0421\u0443\u0431\u0431\u043e\u0442\u0430",
        "events": [
            {
                "startTime": "12:00",
                "name": " QZ01 (\u0428\u0438\u043d\u043e\u0431\u0438)",
                "description": null,
                "modulName": "\u0428\u0438\u043d\u043e\u0431\u0438",
                "systemName": "\u0428\u0438\u043d\u043e\u0431\u0438",
                "iconPath": "content/img/icons/feather.png",
                "color": "#ffffff",
                "order": 0
            },
            {
                "startTime": "12:00",
                "name": "\u042d\u043b\u0435\u043c\u0435\u043d\u0442\u0430\u043b\u044c\u043d\u043e\u0435 \u0437\u043b\u043e",
                "description": null,
                "modulName": "\u042d\u043b\u0435\u043c\u0435\u043d\u0442\u0430\u043b\u044c\u043d\u043e\u0435 \u0437\u043b\u043e",
                "systemName": "Dungeons and Dragons e5",
                "iconPath": "content/img/icons/elementalEvil.png",
                "color": "#2e45ff",
                "order": 1
            },
            {
                "startTime": "16:00",
                "name": "\u0422\u0443\u043c\u0430\u043d\u044b \u0420\u0435\u0439\u0432\u0435\u043d\u0444\u043b\u043e\u0442\u0430 (\u0421\u0442\u0430\u0440\u0448\u0438\u0435)",
                "description": null,
                "modulName": "Dungeons and Dragons e5",
                "systemName": "Dungeons and Dragons e5",
                "iconPath": "content/img/icons/dnd.png",
                "color": "#f45329",
                "order": 2
            }
        ]
    },
    {
        "date": "2022.10.02",
        "weekDayNum": 6,
        "weekDayName": "\u0412\u043e\u0441\u043a\u0440\u0435\u0441\u0435\u043d\u044c\u0435",
        "events": [
            {
                "startTime": "12:00",
                "name": "\u0422\u0443\u043c\u0430\u043d\u044b \u0420\u0435\u0439\u0432\u0435\u043d\u0444\u043b\u043e\u0442\u0430 (\u041c\u043b\u0430\u0434\u0448\u0438\u0435)",
                "description": null,
                "modulName": "Dungeons and Dragons e5",
                "systemName": "Dungeons and Dragons e5",
                "iconPath": "content/img/icons/dnd.png",
                "color": "#f45329",
                "order": 0
            }
        ]
    },
    {
        "date": "2022.10.03",
        "weekDayNum": 0,
        "weekDayName": "\u041f\u043e\u043d\u0435\u0434\u0435\u043b\u044c\u043d\u0438\u043a",
        "events": []
    },
    {
        "date": "2022.10.04",
        "weekDayNum": 1,
        "weekDayName": "\u0412\u0442\u043e\u0440\u043d\u0438\u043a",
        "events": [
            {
                "startTime": "19:00",
                "name": "\u0421\u0440\u0435\u0434\u0438 \u0434\u0440\u0435\u0432\u043d\u0438\u0445 \u0434\u0435\u0440\u0435\u0432\u044c\u0435\u0432 (Call of Cthulhu)",
                "description": null,
                "modulName": "\u0417\u043e\u0432 \u041a\u0442\u0443\u043b\u0445\u0443",
                "systemName": "\u0417\u043e\u0432 \u041a\u0442\u0443\u043b\u0445\u0443",
                "iconPath": "content/img/icons/cthulhu.png",
                "color": "#0e4901",
                "order": 0
            }
        ]
    },
    {
        "date": "2022.10.05",
        "weekDayNum": 2,
        "weekDayName": "\u0421\u0440\u0435\u0434\u0430",
        "events": [
            {
                "startTime": "19:00",
                "name": "\u0418\u0437 \u0411\u0435\u0437\u0434\u043d\u044b",
                "description": null,
                "modulName": "\u0418\u0437 \u0411\u0435\u0437\u0434\u043d\u044b",
                "systemName": "Dungeons and Dragons e5",
                "iconPath": "content/img/icons/abyss.png",
                "color": "#8e24aa",
                "order": 0
            },
            {
                "startTime": "19:00",
                "name": "\u0422\u0435\u0441\u0442\u043e\u0432\u0430\u044f \u0438\u0433\u0440\u0430 \u043f\u043e \u0414\u043d\u0414",
                "description": null,
                "modulName": "Dungeons and Dragons e5",
                "systemName": "Dungeons and Dragons e5",
                "iconPath": "content/img/icons/dnd.png",
                "color": "#f45329",
                "order": 1
            }
        ]
    },
    {
        "date": "2022.10.06",
        "weekDayNum": 3,
        "weekDayName": "\u0427\u0435\u0442\u0432\u0435\u0440\u0433",
        "events": [
            {
                "startTime": "19:00",
                "name": "\u0414\u043e\u043b\u0438\u043d\u0430 \u043b\u0435\u0434\u044f\u043d\u043e\u0433\u043e \u0432\u0435\u0442\u0440\u0430",
                "description": null,
                "modulName": "Dungeons and Dragons e5",
                "systemName": "Dungeons and Dragons e5",
                "iconPath": "content/img/icons/dnd.png",
                "color": "#f45329",
                "order": 0
            }
        ]
    },
    {
        "date": "2022.10.07",
        "weekDayNum": 4,
        "weekDayName": "\u041f\u044f\u0442\u043d\u0438\u0446\u0430",
        "events": []
    },
    {
        "date": "2022.10.08",
        "weekDayNum": 5,
        "weekDayName": "\u0421\u0443\u0431\u0431\u043e\u0442\u0430",
        "events": []
    },
    {
        "date": "2022.10.09",
        "weekDayNum": 6,
        "weekDayName": "\u0412\u043e\u0441\u043a\u0440\u0435\u0441\u0435\u043d\u044c\u0435",
        "events": []
    },
    {
        "date": "2022.10.10",
        "weekDayNum": 0,
        "weekDayName": "\u041f\u043e\u043d\u0435\u0434\u0435\u043b\u044c\u043d\u0438\u043a",
        "events": []
    },
    {
        "date": "2022.10.11",
        "weekDayNum": 1,
        "weekDayName": "\u0412\u0442\u043e\u0440\u043d\u0438\u043a",
        "events": []
    },
    {
        "date": "2022.10.12",
        "weekDayNum": 2,
        "weekDayName": "\u0421\u0440\u0435\u0434\u0430",
        "events": []
    },
    {
        "date": "2022.10.13",
        "weekDayNum": 3,
        "weekDayName": "\u0427\u0435\u0442\u0432\u0435\u0440\u0433",
        "events": []
    },
    {
        "date": "2022.10.14",
        "weekDayNum": 4,
        "weekDayName": "\u041f\u044f\u0442\u043d\u0438\u0446\u0430",
        "events": []
    }
]

```

