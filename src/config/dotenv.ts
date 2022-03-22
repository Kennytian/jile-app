import { config } from 'dotenv';
import { resolve } from 'path';

export const CFG_FILE = process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : '';
const parsed = config({ path: resolve(process.cwd(), `.env${CFG_FILE}`) }).parsed;

// Server configuration
export const APP_PORT = +parsed.APP_PORT;
export const APP_TITLE = parsed.APP_TITLE;

// Redis configuration
export const REDIS_HOST = process.env.REDIS_HOST;
export const REDIS_PORT = +process.env.REDIS_PORT;
export const REDIS_AUTH_PASS = process.env.REDIS_AUTH_PASS;

// Security configuration

// export const ALLOW_ORIGIN = process.env.ALLOW_ORIGIN.split('|').map((item) => {
//   return item.includes('192') || item.includes('?') ? new RegExp(item) : item;
// });

// SMS configuration

// App configuration
