import useInput from "../hooks/use-input";

const SimpleInput = () => {
  const {
    value: enteredName,
    isValid:nameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangeHandler,
    valueBlurHandler: nameBlurHandler,
    reset:resetNameInput
  } = useInput(((value) => value.trim() !== ""));

  const {
    value: enteredEmail,
    isValid: emailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    valueBlurHandler: emailBlurHandler,
    reset:resetEmailInput
  } = useInput((value) => value.includes("@"));

  let formIsValid = false;
  if(nameIsValid && emailIsValid)
  {
    formIsValid=true;
  }

  const nameInputClasses = !nameInputHasError
    ? "form-control"
    : "form-control invalid";

  const emailInputClasses = !emailInputHasError
    ? "form-control"
    : "form-control invalid";

  const submitFormHandler = (event) => {
    event.preventDefault();
    resetNameInput();
    resetEmailInput();
  };

  return (
    <form onSubmit={submitFormHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          value={enteredName}
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
        />
      </div>
      {nameInputHasError && (
        <p className="error-text">Name must not be empty</p>
      )}
      <div className={emailInputClasses}>
        <label htmlFor="email">Your Email</label>
        <input
          type="text"
          id="email"
          value={enteredEmail}
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
        />
      </div>
      {emailInputHasError && <p className="error-text">Enter a valid email</p>}
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
