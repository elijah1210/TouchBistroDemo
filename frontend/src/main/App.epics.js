import { of } from 'rxjs';
import {
  mergeMap,
  map,
  catchError,
  withLatestFrom,
} from 'rxjs/operators';
import {
  ofType,
  combineEpics,
} from 'redux-observable';
import actions from './App.actions';

/**
 * Epic middleware for submitting to api endpoint
 * @param {*} action$ Action stream
 * @param {*} state$ State stream
 * @param {*} param2 Dependencies
 */
export const submitSieveNumberEpic = (action$, state$, { post }) => action$.pipe(
  ofType(actions.submitSieveNumber.START),
  withLatestFrom(state$),
  mergeMap(([, state]) => post('http://localhost:3000/api/ping', { sieveNumber: state.appReducer.inputNumber }, {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  })
    .pipe(
      map(response => actions.submitSieveNumber.success(response)),
      catchError(error => of(actions.submitSieveNumber.failure(error.xhr.response))),
    )),
);

export default combineEpics(submitSieveNumberEpic);
