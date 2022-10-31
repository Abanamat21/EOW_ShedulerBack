import dateFormat from 'dateformat';
// import dateFormat, { masks } from "dateformat";

const LogLevels = {     
    DEBUG: 10,
    INFO: 20,
    WARN: 30,
    ERROR: 40,
    FATAL: 50
 };


function log(text, logLevel = LogLevels.DEBUG){
    logLevel = Object.keys(LogLevels).find(x => LogLevels[x] === logLevel)
    const dateTime = dateFormat(new Date(), "yyyy.mm.dd HH:MM:ss");
    console.log('\x1b[32m%s\x1b[0m | \x1b[32m%s\x1b[0m | %s', dateTime, logLevel, text)
}

export { log };