import json

class AdvantureModul:
    def __init__(self, name, systemId, keyWords = [], color = None, iconPath = None):
        self.name = name
        self.keyWords = keyWords
        self.color = color
        self.iconPath = iconPath
        self.systemId = systemId
        self.system = None

    def toJSON(self):
        return json.dumps(self, default=lambda o: o.__dict__, sort_keys=True, indent=4)

class GameSystem:
    def __init__(self, name, id, keyWords = [], color = None, iconPath = None):
        self.name = name
        self.keyWords = keyWords
        self.color = color
        self.iconPath = iconPath
        self.id = id

    def toJSON(self):
        return json.dumps(self, default=lambda o: o.__dict__, sort_keys=True, indent=4)

MODULS = [
    AdvantureModul(
		'__default',
		1),
	AdvantureModul(
		'Из Бездны',
		1,
		['Бездна', 'Бездны', 'Из Бездны', 'Out of the Abyss', 'Abyss'],
		'#8e24aa',
		'content/img/icons/abyss.png'),
	AdvantureModul(
		'Нисхождение в Авернус',
		1,
		['Нисхождение в Авернус', 'Авернус', 'Avernus', 'Descent into Avernus'],
		'#f45329',
		'content/img/icons/avernus.png'),
	AdvantureModul(
		'Оракул Войны',
		1,
		['Оракул Войны', 'Трофеи Последней Войны', 'Эберрон', 'Eberron', 'Эбберон'],
		'#f45329',
		'content/img/icons/eberron.png'),
	AdvantureModul(
		'Элементальное зло',
		1,
		['Элементальное зло', 'Elemental Evil', 'Мулмастер', 'Mulmaster'],
		'#2e45ff',
		'content/img/icons/elementalEvil.png'),
	AdvantureModul(
		'Гильдия Героев',
		1,
		['Гильдия Героев', 'Гильдия'],
		'#9c9c9c',
		'content/img/icons/guildOfHeroes.png'),
	AdvantureModul(
		'Клад Королевы Драконов',
		1,
		['Клад Королевы Драконов', 'Hoard of the Dragon Queen'],
		'#c30000',
		'content/img/icons/hoardOfTheDragonQueen.png'),
	AdvantureModul(
		'Масти Туманов',
		1,
		['Масти Туманов'],
		'#0e4901'),
	AdvantureModul(
		'Туманы Рейвенлофта',
		1,
		['Туманы Рейвенлофта'],
		'#0e4901'),
]

SYSTEMS = [
    GameSystem(
        'Dungeons and Dragons e5',
        1, # id = 1 должен быть только у ДнД
        ['Dungeons and Dragons', 'DnD', 'Подземелья и драконы', 'D&D', 'ДнД'],
        '#f45329',
        'content/img/icons/dnd.png'
        ),
	GameSystem(
        'Чужой',
        2,
        ['Alien', 'Чужой'],
        '#8e24aa',
        'content/img/icons/alien.png'),
	GameSystem(
        'Зов Ктулху',
        3,
        ['Зов Ктулху', 'Ктулху', 'Call of Cthulhu', 'Cthulhu'],
        '#0e4901',
        'content/img/icons/cthulhu.png'),
	GameSystem(
        'Дюна: Приключения в Империи',
        4,
        ['Дюна', 'Dune'],
        '#f45329',
        'content/img/icons/dune.png'),
	GameSystem(
        'Starfinder',
        5,
        ['Starfinder', 'Старфайндер'],
        '#10b4e9',
        'content/img/icons/starfinder.png'),
	GameSystem(
        'Warhammer',
        6,
        ['Warhammer', 'Молот войны', 'Вархаммер'],
        '#0e4901',
        'content/img/icons/warhammer.png'),
	GameSystem(
        'Delta Green',
        7,
        ['Delta Green', 'Delta', 'Дельта Грин'],
        '#0e4901',
        'content/img/icons/cthulhu.png'),
	GameSystem(
        'Cyberpunk',
        8,
        ['Cyberpunk', 'Киберпанк'],
        '#fdf000',
        'content/img/icons/cyberpunk.png'),
	GameSystem(
        'Шиноби',
        9,
        ['Шиноби', 'Shinobi'],
        '#ffffff',
        'content/img/icons/feather.png'),
]