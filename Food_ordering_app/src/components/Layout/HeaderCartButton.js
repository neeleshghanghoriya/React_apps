import React, {useContext, useEffect, useState} from 'react';
import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css'
import CartContext from '../../store/cart-context';

const HeaderCartButton = (props) => {
    const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
    const cartCtx = useContext(CartContext);
    const {items} = cartCtx;
    const noOfItemsInCart = cartCtx.items.reduce((curNum,item) => {
        return curNum + item.amount;
    },0);
    useEffect(() =>{
        if(items.length === 0)
        {
            return;
        }
        setBtnIsHighlighted(true);
        const timer = setTimeout(()=>{
            setBtnIsHighlighted(false)
        }, 300);
        return () => {
            clearTimeout(timer);
        };
    },[items]);
    const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump: ''}`;
    return(
        <button className={btnClasses} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>CART</span>
            <span className={classes.badge}>
                {noOfItemsInCart}
            </span>
        </button>
    )

};

export default HeaderCartButton;