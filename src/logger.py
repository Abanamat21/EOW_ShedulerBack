from distutils.log import FATAL
from enum import Enum
from datetime import datetime
from termcolor import colored

class LogLevel(Enum):
    DEBUG = 10
    INFO = 20
    WARN = 30
    ERROR = 40
    FATAL = 50

def log(text, logLevel = LogLevel.DEBUG):
    now = datetime.now().strftime('%Y.%m.%d %H:%M:%S')
    print ('{dateTime} | {logLevel} | {text}'.format(dateTime = colored(now, 'green'), logLevel = colored(logLevel.name, 'green'), text = text))