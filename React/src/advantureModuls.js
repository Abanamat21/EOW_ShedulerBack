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
          "color": "#3f3b52",
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
          "color": "#d52578",
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
          "color": "#ee8d22",
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
          "color": "#005cc1",
          "iconPath": "elementalEvil.png",
          "systemId": 1
        },
        {
          "name": "Гильдия Героев",
          "keyWords": [
            "Гильдия Героев",
            "Гильдия"
          ],
          "color": "#e75cdd",
          "iconPath": "guildOfHeroes.png",
          "systemId": 1
        },
        {
          "name": "Клад Королевы Драконов",
          "keyWords": [
            "Клад Королевы Драконов",
            "Hoard of the Dragon Queen"
          ],
          "color": "#706df8",
          "iconPath": "hoardOfTheDragonQueen.png",
          "systemId": 1
        },
        {
          "name": "Масти Туманов",
          "keyWords": [
            "Масти Туманов"
          ],
          "color": "#3bc609",
          "systemId": 1
        },
        {
          "name": "Туманы Рейвенлофта",
          "keyWords": [
            "Туманы Рейвенлофта",
            "Туманы Рейвенфлота"
          ],
          "color": "#d54127",
          "systemId": 1
        },
        {
          "name": "Драконий Куш",
          "keyWords": [
            "Драконий Куш",
            "Драконний Куш",
            "Dragon Heist"
          ],
          "color": "#FFD700",
          "systemId": 1
        },
        {
          "name": "Лихо",
          "keyWords": [
            "Лихо",
            "Lyho"
          ],
          "iconPath": "lyho.png",
          "color": "#48331C",
          "systemId": 6
        },
        {
          "name": "Эноа",
          "keyWords": [
            "Эноа"
          ],
          "iconPath": "enoa.png",
          "color": "#e1ab0a",
          "systemId": 1
        },
        {
          "name": "Долина ледяного ветра",
          "keyWords": [
            "Долина ледяного ветра",
            "Айсвиндейл",
            "Icewind Dale"
          ],
          "iconPath": "iceWindDale.png",
          "color": "#5d36e1",
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
          "color": "#3f3b52",
          "iconPath": "dnd.png",
          "id": 1 
        },
        {
          "name": "Чужой",
          "keyWords": [
            "Alien",
            "Чужой"
          ],
          "color": "#202B34",
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
          "color": "#273B33",
          "iconPath": "cthulhu.png",
          "id": 3
        },
        {
          "name": "Дюна: Приключения в Империи",
          "keyWords": [
            "Дюна",
            "Dune"
          ],
          "color": "#e1ab0a",
          "iconPath": "dune.png",
          "id": 4
        },
        {
          "name": "Starfinder",
          "keyWords": [
            "Starfinder",
            "Старфайндер"
          ],
          "color": "#d52578",
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
          "color": "#0fa041",
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
          "color": "#3bc609",
          "iconPath": "cthulhu.png",
          "id": 7
        },
        {
          "name": "Cyberpunk",
          "keyWords": [
            "Cyberpunk",
            "Киберпанк"
          ],
          "color": "#005cc1",
          "iconPath": "cyberpunk.png",
          "id": 8
        },
        {
          "name": "Шиноби",
          "keyWords": [
            "Шиноби",
            "Shinobi"
          ],
          "color": "#f4cd70",
          "iconPath": "feather.png",
          "id": 9
        },
        {
          "name": "Кавалерия",
          "keyWords": [
            "Кавалерия"
          ],
          "color": "#08ca8e",
          "iconPath": "cavalry.png",
          "id": 10
        },
        {
          "name": "Культ",
          "keyWords": [
            "Культ", "Kult"
          ],
          "color": "#d54127",
          "iconPath": "kult.png",
          "id": 11
        },
        {
          "name": "Mork Borg",
          "keyWords": [
            "Mork Borg"
          ],
          "color": "#08ca8e",
          "iconPath": "morkBorg.png",
          "id": 12
        },
        {
          "name": "Savage World",
          "keyWords": [
            "Savage World"
          ],
          "color": "#e1ab0a",
          "iconPath": "savageWorlds.png",
          "id": 13
        },
        {
          "name": "FATE",
          "keyWords": [
            "Fate",
            "Фэйт"
          ],
          "color": "#f4cd70",
          "iconPath": "fate.png",
          "id": 14
        },
        {
          "name": "City Of Mist",
          "keyWords": [
            "City Of Mist"
          ],
          "color": "#d52578",
          "iconPath": "cityOfMist.png",
          "id": 15
        },
        {
          "name": "Vampire: The Masquerade",
          "keyWords": [
            "vtm",
            "Vampire: The Masquerade",
            "Vampire The Masquerade",
            "Вампиры, маскарад",
            "Вампиры: маскарад",
            "Вампиры маскарад"
          ],
          "color": "#d54127",
          "iconPath": "vtm.png",
          "id": 16
        }
      ]
    return ret;
}

