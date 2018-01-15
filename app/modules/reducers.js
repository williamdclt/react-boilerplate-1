import { combineReducers } from 'redux';
import language from './language/language.reducer';
import route from './routing/routing.reducer';

export default function createReducer(injectedReducers) {
  /*
 * You can add your new reducers below.
 * Alternatively, you can also inject a reducer dynamically in a component using
 * `utils/injectReducer`. More infos in docs/working-standards/reducers.md.
 */
  return combineReducers({
    route,
    language,
    // below are the dynamically injected reducers. Don't move it!
    ...injectedReducers,
  });
}
