/* eslint-disable no-console */
import { staticColors as colors } from '@assets/styles/color';
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

  static info(message?: any, ...optionalParams: any[]) {
    console.log(chalk.cyan(message), ...optionalParams);
    return this;
  }

  static scream(message: string, color: string) {
    console.log(
      `%c${message}`,
      `-webkit-text-stroke: 2px black;font-size: xxx-large;font-weight:bold;color:${
        color ?? colors.cold_blue
      };`,
    );
    return this;
  }
}
Logger.scream('STOP THERE!!!', colors.hot_red);
