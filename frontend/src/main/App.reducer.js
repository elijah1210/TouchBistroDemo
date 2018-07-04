import actions from './App.actions';

// Initial state for redux.
export const initialState = {
  hasError: false,
  inputNumber: 0,
  medianPrimes: [],
  hasPrimes: false,
  errorMessage: '',
  submitted: false,
};

/**
 * Reducer for the main app.
 */
export default (state = initialState, action) => {
  const { payload } = action;
  switch (action.type) {
    case actions.submitSieveNumber.SUCCESS:
      return {
        ...state,
        medianPrimes: payload,
        hasError: false,
        hasPrimes: payload.length > 0,
        submitted: true,
      };
    case actions.inputNumberChange.type:
      return {
        ...state,
        inputNumber: payload || 0,
        hasError: false,
        errorMessage: '',
        hasPrimes: false,
        medianPrimes: [],
      };
    case actions.submitSieveNumber.FAILURE:
      return {
        ...state,
        hasError: true,
        errorMessage: payload.message,
        medianPrimes: [],
        hasPrimes: false,
        submitted: true,
      };
    case actions.submitSieveNumber.START:
    default:
      return state;
  }
};
