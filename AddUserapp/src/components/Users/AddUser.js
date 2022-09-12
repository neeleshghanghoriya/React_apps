import React, { useState } from "react";
import Card from "../UI/Card";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";

import classes from "./AddUser.module.css";

const AddUser = (props) => {
  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredAge, setEnteredAge] = useState("");
  const [error, setError] = useState(null);

  const AddUserHandler = (event) => {
    event.preventDefault();

    if (enteredUsername.trim().length === 0 || enteredAge.trim().length === 0) {
      setError({
        title: "Invalid Input",
        message: "Please enter a valid name and age (non-empty value)",
      });
      return;
    }
    if (+enteredAge < 1) {
      setError({
        title: "Please Enter a valid age",
        message: "Please enter a valid age (>0)",
      });
      return;
    }
    props.onAddUser(enteredUsername, enteredAge);
    console.log(enteredUsername, enteredAge);

    setEnteredUsername("");
    setEnteredAge("");
  };

  const usernameChangeHandler = (event) => {
    setEnteredUsername(event.target.value.trim());
  };

  const ageChangeHandler = (event) => {
    setEnteredAge(event.target.value.trim());
  };
  const errorHandler = () => {
    setError(null);
  };
  const errorDismissHandler = () => {
    setError(null);
    console.log("inside error modal button handler")
  };

  return (
    <>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
          onButtonConfirm={errorDismissHandler}
        />
      )}
      <Card className={classes.input}>
        <form>
          <label htmlFor="username">UserName</label>
          <input
            id="username"
            value={enteredUsername}
            onChange={usernameChangeHandler}
          />
          <label htmlFor="age">Age (years)</label>
          <input id="age" value={enteredAge} onChange={ageChangeHandler} />
          <Button type="submit" onClickHandler={AddUserHandler}>
            Add User
          </Button>
        </form>
      </Card>
    </>
  );
};

export default AddUser;
