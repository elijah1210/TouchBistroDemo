import React from 'react';
import { render } from 'react-dom';
import { of } from 'rxjs';
import { toArray } from 'rxjs/operators';
import { isEqual } from 'lodash';

import { App } from './components/App';
import actions from './App.actions';
import appReducer from './App.reducer';
import * as epics from './App.epics';

describe('<App />', () => {
  it('shall render without crashing.', () => {
    const div = document.createElement('div');
    render(
      <App
        submitNumber={jest.fn()}
        updateInputNumber={jest.fn()}
        inputNumber={0}
        medianPrimes={[]}
      />, div,
    );
  });
});

describe('App Reducer', () => {
  it('shall handle input number change action.', () => {
    const initialState = {
      inputNumber: 0,
      medianPrimes: [],
    };

    const stateAfter = {
      inputNumber: 4,
      medianPrimes: [],
    };

    const action = {
      type: actions.inputNumberChange.type,
      payload: 4,
    };

    expect(appReducer(initialState, action)).toEqual(stateAfter);
  });
});

describe('App Epics', () => {
  it('shall handle submitSieveNumber.', () => {
    const mockResponse = [3, 5];
    const action$ = of({ type: actions.submitSieveNumber.START });
    const state$ = of({
      appReducer: {
        inputNumber: 10,
      },
    });

    const expectedOutput = [{
      type: actions.submitSieveNumber.SUCCESS,
      payload: mockResponse,
    }];

    const dependencies = {
      post: () => of(mockResponse),
    };

    const result$ = epics.submitSieveNumberEpic(action$, state$, dependencies)
      .pipe(
        toArray(),
      );

    // For some reason, no matter what the jest condition is, the test always passes.
    // Use lodash deep equality check and a variable to ensure that the value is correct.
    let outputsEqual = false;

    result$.subscribe((outputActions) => {
      outputsEqual = isEqual(outputActions, expectedOutput);
    });
    expect(outputsEqual).toEqual(true);
  });
});
