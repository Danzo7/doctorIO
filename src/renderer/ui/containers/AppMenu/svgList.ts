import clinic from 'toSvg/clinic.svg?icon';
import database from 'toSvg/database.svg?icon';
import history from 'toSvg/history.svg?icon';
import home from 'toSvg/home.svg?icon';
import logo from 'toSvg/logo.svg?icon';
import messages from 'toSvg/messages.svg?icon';
import settings from 'toSvg/settings.svg?icon';
import stats from 'toSvg/stats.svg?icon';
export default {
  home,
  messages,
  stats,
  history,
  database,
  clinic,
  settings,
  logo,
};
export { home, messages, stats, history, database, clinic, settings, logo };
type Strokes = {
  [key: string]: string;
};

export const strokeTypes: Strokes = {
  home: 'fill',
  messages: 'stroke',
  stats: 'stroke',
  history: 'stroke',
  database: 'fill',
  clinic: 'stroke',
  settings: 'stroke',
  logo: 'fill',
};
