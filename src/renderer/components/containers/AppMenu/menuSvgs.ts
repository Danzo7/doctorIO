import clinic from 'toSvg/clinic.svg';
import database from 'toSvg/database.svg';
import history from 'toSvg/history.svg';
import home from 'toSvg/home.svg';
import logo from 'toSvg/logo.svg?url';
import messages from 'toSvg/messages.svg';
import settings from 'toSvg/settings.svg';
import stats from 'toSvg/stats.svg';
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
