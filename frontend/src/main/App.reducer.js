import actions from './App.actions';

const initialState = {
  inputNumber: 0,
  medianPrimes: [],
};

export default (state = initialState, action) => {
  const { payload } = action;
  switch (action.type) {
    case actions.submitSieveNumber.SUCCESS:
      return { ...state, medianPrimes: payload.response };
    case actions.inputNumberChange.type:
      return { ...state, inputNumber: payload };
    case actions.submitSieveNumber.FAILURE:
      window.alert(payload);
      return state;
    case actions.submitSieveNumber.START:
    default:
      return state;
  }
};
