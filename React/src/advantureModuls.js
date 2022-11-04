class AdvantureModul {
    constructor(name, systemId, keyWords = [], color = undefined, iconPath = undefined) {
        this.name = name;
        this.keyWords = keyWords;
        this.color = color;
        this.iconPath = iconPath;
        this.systemId = systemId;
        this.system = undefined;
    }
}

class GameSystem {
    constructor(name, id, keyWords = [], color = undefined, iconPath = undefined) {
        this.name = name;
        this.keyWords = keyWords;
        this.color = color;
        this.iconPath = iconPath;
        this.id = id;
    }
}


export function allModusls() {
    const ret = [
        {
          "name": "__default",
          "keyWords": [],
          "systemId": 1
        },
        {
          "name": "Из Бездны",
          "keyWords": [
            "Бездна",
            "Бездны",
            "Из Бездны",
            "Out of the Abyss",
            "Abyss"
          ],
          "color": "#8e24aa",
          "iconPath": "abyss.png",
          "systemId": 1
        },
        {
          "name": "Нисхождение в Авернус",
          "keyWords": [
            "Нисхождение в Авернус",
            "Авернус",
            "Avernus",
            "Descent into Avernus"
          ],
          "color": "#f45329",
          "iconPath": "avernus.png",
          "systemId": 1
        },
        {
          "name": "Оракул Войны",
          "keyWords": [
            "Оракул Войны",
            "Трофеи Последней Войны",
            "Эберрон",
            "Eberron",
            "Эбберон"
          ],
          "color": "#D5AC1D",
          "iconPath": "eberron.png",
          "systemId": 1
        },
        {
          "name": "Элементальное зло",
          "keyWords": [
            "Элементальное зло",
            "Elemental Evil",
            "Мулмастер",
            "Mulmaster"
          ],
          "color": "#055FC8",
          "iconPath": "elementalEvil.png",
          "systemId": 1
        },
        {
          "name": "Гильдия Героев",
          "keyWords": [
            "Гильдия Героев",
            "Гильдия"
          ],
          "color": "#450265",
          "iconPath": "guildOfHeroes.png",
          "systemId": 1
        },
        {
          "name": "Клад Королевы Драконов",
          "keyWords": [
            "Клад Королевы Драконов",
            "Hoard of the Dragon Queen"
          ],
          "color": "#008A69",
          "iconPath": "hoardOfTheDragonQueen.png",
          "systemId": 1
        },
        {
          "name": "Масти Туманов",
          "keyWords": [
            "Масти Туманов"
          ],
          "color": "#0e4901",
          "systemId": 1
        },
        {
          "name": "Туманы Рейвенлофта",
          "keyWords": [
            "Туманы Рейвенлофта",
            "Туманы Рейвенфлота"
          ],
          "color": "#920101",
          "systemId": 1
        },
        {
          "name": "Драконий Куш",
          "keyWords": [
            "Драконий Куш",
            "Драконний Куш",
            "Dragon Heist"
          ],
          "color": "#008A69",
          "systemId": 1
        }
    ]
    return ret;
}

export function allSystems() {
    const ret = [
        {
          "name": "Dungeons and Dragons e5",
          "keyWords": [
            "Dungeons and Dragons",
            "DnD",
            "Подземелья и драконы",
            "D&D",
            "ДнД"
          ],
          "color": "#000000",
          "iconPath": "dnd.png",
          "id": 1 
        },
        {
          "name": "Чужой",
          "keyWords": [
            "Alien",
            "Чужой"
          ],
          "color": "#8e24aa",
          "iconPath": "alien.png",
          "id": 2
        },
        {
          "name": "Зов Ктулху",
          "keyWords": [
            "Зов Ктулху",
            "Ктулху",
            "Call of Cthulhu",
            "Cthulhu"
          ],
          "color": "#0e4901",
          "iconPath": "cthulhu.png",
          "id": 3
        },
        {
          "name": "Дюна: Приключения в Империи",
          "keyWords": [
            "Дюна",
            "Dune"
          ],
          "color": "#8B4402",
          "iconPath": "dune.png",
          "id": 4
        },
        {
          "name": "Starfinder",
          "keyWords": [
            "Starfinder",
            "Старфайндер"
          ],
          "color": "#10b4e9",
          "iconPath": "starfinder.png",
          "id": 5
        },
        {
          "name": "Warhammer",
          "keyWords": [
            "Warhammer",
            "Молот войны",
            "Вархаммер"
          ],
          "color": "#0e4901",
          "iconPath": "warhammer.png",
          "id": 6
        },
        {
          "name": "Delta Green",
          "keyWords": [
            "Delta Green",
            "Delta",
            "Дельта Грин"
          ],
          "color": "#0e4901",
          "iconPath": "cthulhu.png",
          "id": 7
        },
        {
          "name": "Cyberpunk",
          "keyWords": [
            "Cyberpunk",
            "Киберпанк"
          ],
          "color": "#fdf000",
          "iconPath": "cyberpunk.png",
          "id": 8
        },
        {
          "name": "Шиноби",
          "keyWords": [
            "Шиноби",
            "Shinobi"
          ],
          "color": "#888888",
          "iconPath": "feather.png",
          "id": 9
        },
        {
          "name": "Кавалерия",
          "keyWords": [
            "Кавалерия"
          ],
          "color": "#f45329",
          "iconPath": "feather.png",
          "id": 10
        },
        {
          "name": "Культ",
          "keyWords": [
            "Культ", "Kult"
          ],
          "color": "#000000",
          "iconPath": "kult.png",
          "id": 11
        },
        {
          "name": "Mork Borg",
          "keyWords": [
            "Mork Borg"
          ],
          "color": "#f45329",
          "iconPath": "feather.png",
          "id": 12
        },
        {
          "name": "Savage World",
          "keyWords": [
            "Savage World"
          ],
          "color": "#f45329",
          "iconPath": "feather.png",
          "id": 13
        }
      ]
    return ret;
}

