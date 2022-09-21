import React, {useState, useRef} from 'react';
import classes from './MealItemForm.module.css';
import Input from '../../UI/Input';

const MealItemForm = (props) => {
    const [amountIsValid, setAmountIsValid] = useState(true)
    const inputAmountRef = useRef();
    const submitHandler = (event) => {
        event.preventDefault();
        const enteredAmount = inputAmountRef.current.value;
        const enteredAmountNumber = +enteredAmount;
        if (enteredAmount.trim().length === 0  || enteredAmountNumber < 1 || enteredAmountNumber > 5)
        {
            setAmountIsValid(false)
            return;
        }
        props.onAddToCart(enteredAmountNumber);
    }

    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <Input label="Amount" input={{
                ref:inputAmountRef,
                id:'amount_' + props.id,
                type:'number',
                min:'1',
                max:'5',
                step:'1',
                defaultValue:'1'
            }} />
            <button onClick={submitHandler}> + Add </button>
            {!amountIsValid && <p>Enter a valid amount (1-5)</p>}
        </form>
    )
};

export default MealItemForm;
