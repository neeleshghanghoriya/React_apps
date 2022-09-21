import React, { useContext } from "react";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({...item,amount:1})
  };

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id)
  };
  
  const cartItems = (
    <ui className={classes["cart-items"]}>
      {cartCtx.items.map((item) => {
        return (
          <CartItem
            key={item.id}
            name={item.name}
            amount={item.amount}
            price={item.price}
            onRemove={cartItemRemoveHandler.bind(null,item.id)}
            onAdd={cartItemAddHandler.bind(null,item)}
          />
        );
      })}
    </ui>
  );
  const cartHasItem = cartCtx.items.length > 0 ? true : false;
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onClose}>
          Close
        </button>
        {cartHasItem && <button ClassName={classes.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
