import useInput from "../hooks/use-input";
const BasicForm = (props) => {
  const {
    value: firstName,
    isValid: firstNameIsValid,
    hasError: firstNameHasError,
    valueChangeHandler: firstNameChangeHandler,
    valueBlurHandler: firstNameBlurHandler,
    reset: resetFirstName,
  } = useInput((value) => value.trim() !== "");

  const {
    value: lastName,
    isValid: lastNameIsValid,
    hasError: lastNameHasError,
    valueChangeHandler: lastNameChangeHandler,
    valueBlurHandler: lastNameBlurHandler,
    reset: resetLastName,
  } = useInput((value) => value.trim() !== "");

  const {
    value: email,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    valueBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput((value) => value.trim()!=='' && value.includes("@"));

  let formIsValid = false;
  if (firstNameIsValid && lastNameIsValid && emailIsValid) {
    formIsValid = true;
  }
  const submitFormHandler = (event) => {
    event.preventDefault();
    if(!formIsValid)
    return;
    resetFirstName();
    resetLastName();
    resetEmail();
  };

  const firstNameInputClasses = firstNameHasError ? "form-control invalid":"form-control";
  const lastNameInputClasses = lastNameHasError? "form-control invalid":"form-control";
  const emailInputClasses = emailHasError? "form-control invalid":"form-control";
  return (
    <form onSubmit={submitFormHandler}>
      <div className="control-group">
        <div className={firstNameInputClasses}>
          <label htmlFor="firstname">First Name</label>
          <input
            type="text"
            id="firstname"
            value={firstName}
            onChange={firstNameChangeHandler}
            onBlur={firstNameBlurHandler}
          />
        </div>
        {firstNameHasError && <p className="error-text">first name must not be empty</p>}
        <div className={lastNameInputClasses}>
          <label htmlFor="lastname">Last Name</label>
          <input type="text" id="lastname"
          value={lastName}
          onChange={lastNameChangeHandler}
          onBlur={lastNameBlurHandler}
          />
        </div>
        {lastNameHasError && <p className="error-text">last Name must not be empty</p>}
      </div>
      <div className={emailInputClasses}>
        <label htmlFor="emailname">E-Mail Address</label>
        <input type="text" id="email" 
        value={email}
        onChange={emailChangeHandler}
        onBlur={emailBlurHandler}/>
      </div>
      {emailHasError && <p className="error-text">email address must be valid</p>}
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
