import src.googleCalendareService as googleCalendareService
import src.logger as logger

import datetime
import json
from json import JSONEncoder

# Правило сериализации, без нее не получится сериализовать в JSON
class EventDayEncoder(JSONEncoder):
    def default(self, o):
        if (isinstance(o, datetime.date)):
            return o.strftime("%Y.%m.%d")
        elif (isinstance(o, datetime.time)):
            return o.strftime("%H:%M")
        elif (isinstance(o, datetime.datetime)):
            return o.strftime("%Y.%m.%d %H:%M")
        else:
            return o.__dict__

logger.log('Start!')

eventDays = googleCalendareService.getGroupedEvents()
eventDaysJSONData = json.dumps(eventDays, indent=4, cls=EventDayEncoder)
print(eventDaysJSONData)

logger.log('End!')

