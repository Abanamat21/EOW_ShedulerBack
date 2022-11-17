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
          "color": "#762D6A",
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
          "color": "#FEE500",
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
          "color": "#E37A33",
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
          "color": "#006CB4",
          "iconPath": "elementalEvil.png",
          "systemId": 1
        },
        {
          "name": "Гильдия Героев",
          "keyWords": [
            "Гильдия Героев",
            "Гильдия"
          ],
          "color": "#61398B",
          "iconPath": "guildOfHeroes.png",
          "systemId": 1
        },
        {
          "name": "Клад Королевы Драконов",
          "keyWords": [
            "Клад Королевы Драконов",
            "Hoard of the Dragon Queen"
          ],
          "color": "#8D6CAB",
          "iconPath": "hoardOfTheDragonQueen.png",
          "systemId": 1
        },
        {
          "name": "Масти Туманов",
          "keyWords": [
            "Масти Туманов"
          ],
          "color": "#1E7040",
          "systemId": 1
        },
        {
          "name": "Туманы Рейвенлофта",
          "keyWords": [
            "Туманы Рейвенлофта",
            "Туманы Рейвенфлота"
          ],
          "color": "#B12629",
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
          "color": "#e8443c",
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
          "color": "#DA8020",
          "iconPath": "dune.png",
          "id": 4
        },
        {
          "name": "Starfinder",
          "keyWords": [
            "Starfinder",
            "Старфайндер"
          ],
          "color": "#0092C9",
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
          "color": "#B1302A",
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
          "color": "#589C63",
          "iconPath": "cthulhu.png",
          "id": 7
        },
        {
          "name": "Cyberpunk",
          "keyWords": [
            "Cyberpunk",
            "Киберпанк"
          ],
          "color": "#FDE100",
          "iconPath": "cyberpunk.png",
          "id": 8
        },
        {
          "name": "Шиноби",
          "keyWords": [
            "Шиноби",
            "Shinobi"
          ],
          "color": "#202B34",
          "iconPath": "feather.png",
          "id": 9
        },
        {
          "name": "Кавалерия",
          "keyWords": [
            "Кавалерия"
          ],
          "color": "#E5801C",
          "iconPath": "cavalry.png",
          "id": 10
        },
        {
          "name": "Культ",
          "keyWords": [
            "Культ", "Kult"
          ],
          "color": "#B12629",
          "iconPath": "kult.png",
          "id": 11
        },
        {
          "name": "Mork Borg",
          "keyWords": [
            "Mork Borg"
          ],
          "color": "#FDE100",
          "iconPath": "morkBorg.png",
          "id": 12
        },
        {
          "name": "Savage World",
          "keyWords": [
            "Savage World"
          ],
          "color": "#B3B3B0",
          "iconPath": "savageWorlds.png",
          "id": 13
        },
        {
          "name": "FATE",
          "keyWords": [
            "Fate",
            "Фэйт"
          ],
          "color": "#008BCC",
          "iconPath": "fate.png",
          "id": 14
        },
        {
          "name": "City Of Mist",
          "keyWords": [
            "City Of Mist"
          ],
          "color": "#263F8C",
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
          "color": "#B12629",
          "iconPath": "vtm.png",
          "id": 16
        }
      ]
    return ret;
}

