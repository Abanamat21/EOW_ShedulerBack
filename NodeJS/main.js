import { getGroupedEvents } from "./src/googleCalendareService.js";
import { log } from "./src/logger.js";
// const dateFormat = require('dateformat');

log('START!');
const result = await getGroupedEvents();
log('result: ' + JSON.stringify(result));
log('END!');
