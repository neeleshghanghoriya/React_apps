import React, { useState, useReducer } from "react";

const initialInputState = { value: "", isTouched: false };

const inputStateReducer = (state, action) => {
  if (action.type === "INPUT_CHANGE") {
    return { value: action.value, isTouched: state.isTouched};
  }
  if (action.type === "INPUT_BLUR") {
    return {
        value:state.value,
        isTouched:true
    }
  }
  if (action.type === "RESET") {return initialInputState};

  return {
    value: "",
    isTouched: false,
  };
};

const useInput = (validateValue) => {
  const [inputState, dispatch] = useReducer(
    inputStateReducer,
    initialInputState
  );

  //   const [enteredValue, setEnteredValue] = useState('');
  //   const [isTouched, setIsTouched] = useState(false);
  const valueIsValid = validateValue(inputState.value);
  const hasError = !valueIsValid && inputState.isTouched;

  const valueChangeHandler = (event) => {
    dispatch({ type: "INPUT_CHANGE", value: event.target.value });
  };

  const valueBlurHandler = (event) => {
    dispatch({ type: "INPUT_BLUR" });
  };

  const reset = () => {
    dispatch({ type: "RESET" });
  };

  return {
    value: inputState.value,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    valueBlurHandler,
    reset,
  };
};

export default useInput;
