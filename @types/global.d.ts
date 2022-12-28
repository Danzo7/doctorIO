/* eslint-disable no-undef */
/* Use this file to declare any custom file extensions for importing */
/* Use this folder to also add/extend a package d.ts file, if needed. */
/*Webpack Defining Variables*/
declare const APP_WEBPACK_ENTRY: string;
declare const APP_PRELOAD_WEBPACK_ENTRY: string;
declare const IS_DEV: boolean;
declare const FROM_ELECTRON: boolean;
declare const FROM_TAURI: boolean;
declare const IS_DESKTOP: boolean;

/* CSS MODULES */
declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}
declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}
declare module '*.module.sass' {
  const classes: { [key: string]: string };
  export default classes;
}
declare module '*.module.less' {
  const classes: { [key: string]: string };
  export default classes;
}
declare module '*.module.styl' {
  const classes: { [key: string]: string };
  export default classes;
}

/* CSS */
declare module '*.css';
declare module '*.scss';
declare module '*.sass';
declare module '*.less';
declare module '*.styl';

/* IMAGES */

declare module '*.svg' {
  const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}
declare module '*.svg?icon' {
  const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}
declare module '*.svg?url' {
  const ref: string;
  export default ref;
}
declare module '*.bmp' {
  const ref: string;
  export default ref;
}
declare module '*.gif' {
  const ref: string;
  export default ref;
}
declare module '*.jpg' {
  const ref: string;
  export default ref;
}
declare module '*.jpeg' {
  const ref: string;
  export default ref;
}
declare module '*.png' {
  const ref: string;
  export default ref;
}
declare module '*.mp3' {
  const ref: string;
  export default ref;
}
/**
 * Predifined variables from webpack to Tell if we are in electron or web
 */
interface ServerError {
  errorCode: number;
  message: string;
}
/* CUSTOM: ADD YOUR OWN HERE */
declare module 'pixrem';
declare module 'postcss-opacity';
declare module 'postcss-will-change';
declare module 'postcss-vmin';
declare module 'postcss-pseudoelements';
declare module 'postcss-color-rgba-fallback';
