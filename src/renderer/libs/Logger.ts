/* eslint-disable no-console */
import chalk from 'chalk';

export class Logger {
  static log(title: string, message?: any, ...optionalParams: any[]) {
    console.log(
      chalk.cyan(`[${title}] `) + (message != undefined ? message : ''),
      ...optionalParams,
    );
    return this;
  }

  static error(title: string, message?: string, ...optionalParams: any[]) {
    console.error(
      chalk.cyan(`[${title}] `) + (message != undefined ? message : ''),
      ...optionalParams,
    );
    return this;
  }

  static warn(title: string, message?: string, ...optionalParams: any[]) {
    console.warn(
      chalk.cyan(`[${title}] `) + (message != undefined ? message : ''),
      ...optionalParams,
    );
    return this;
  }
}
