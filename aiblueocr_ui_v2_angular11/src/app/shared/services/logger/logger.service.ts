import { Inject, Injectable } from '@angular/core';
import { format } from 'date-fns';

import { LOG_LEVEL_TOKEN } from '../../token/app.tokens';

import { LogLevel } from './log-level.enum';

@Injectable()
export class LoggerService {
    logLevel: LogLevel;
    logs: string[] = [];
    private readonly MAX_HISTORY_CNT: number = 100;
    private readonly TIME_FORMATTER: string = 'yyyy-MM-dd HH:mm:ss.SSS';

    constructor(@Inject(LOG_LEVEL_TOKEN) logLevel: LogLevel) {
        this.logLevel = logLevel;
    }

    debug(msg: string, optionalParams: any[] = []) {
        this.log(LogLevel.DEBUG, msg, optionalParams);
    }

    info(msg: string, optionalParams: any[] = []) {
        this.log(LogLevel.INFO, msg, optionalParams);
    }

    warn(msg: string, optionalParams: any[] = []) {
        this.log(LogLevel.WARN, msg, optionalParams);
    }

    error(msg: string, optionalParams: any[] = []) {
        this.log(LogLevel.ERROR, msg, optionalParams);
    }

    log(logLevel: LogLevel, msg: string, optionalParams: any[]) {
        const logMsg = this.getFormattedLogMsg(logLevel, msg);
        if (this.isProperLogLevel(logLevel)) {
            console.log(logMsg, optionalParams);
            this.keepLogHistory(logMsg);
        }
    }

    private getFormattedLogMsg(logLevel: LogLevel, msg: string) {
        const curTimestamp = format(new Date(), this.TIME_FORMATTER);
        return `[${LogLevel[logLevel]}]  ${curTimestamp} - ${msg}`;
    }

    private keepLogHistory(log: string) {
        if (this.logs.length === this.MAX_HISTORY_CNT) {
            this.logs.shift();
        }
        this.logs.push(log);
    }

    private isProperLogLevel(logLevel: LogLevel): boolean {
        if (this.logLevel === LogLevel.DEBUG) {
            return true;
        }
        return logLevel >= this.logLevel;
    }
}
