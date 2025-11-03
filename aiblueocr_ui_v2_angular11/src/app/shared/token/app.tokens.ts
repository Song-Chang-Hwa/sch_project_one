import { InjectionToken } from '@angular/core';

import { LogLevel } from '../services/logger/log-level.enum';
export const LOG_LEVEL_TOKEN = new InjectionToken<LogLevel>('logLevel');

export const API_URL_TOKEN = new InjectionToken<string>('API_URL');
export const API_URL_TOKEN1 = new InjectionToken<string>('API_URL1');
export const API_URL_TOKEN2 = new InjectionToken<string>('API_URL2');
export const REMOTE_URL_TOKEN = new InjectionToken<string>('REMOTE_URL_TOKEN');
export const API_ROOT_TOKEN = new InjectionToken<string>('API_ROOT');
export const API_ACCESS_TOKEN = new InjectionToken<string>('API_ACCESS');
export const LOG_DEBUG_LEVEL_TOKEN = new InjectionToken<string>('LOG_DEBUG_LEVEL');
export const USER_FOLDER_CURRENT_SNO_TOKEN = new InjectionToken<string>(
    'USER_FOLDER_CURRENT_SNO_TOKEN'
);
