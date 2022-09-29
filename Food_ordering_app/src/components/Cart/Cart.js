import React, { useContext, useState } from "react";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const submitHandler = async (userData) => {
    setIsSubmiting(true)
    await fetch("https://react-http-4e53f-default-rtdb.firebaseio.com/orders.json",{
      method:'POST',
      body:JSON.stringify({
        user:userData,
        orderedItems:cartCtx.items
      })
    })
    cartCtx.clearCart();
    setIsSubmiting(false)
    setDidSubmit(true)
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
            onRemove={cartItemRemoveHandler.bind(null, item.id)}
            onAdd={cartItemAddHandler.bind(null, item)}
          />
        );
      })}
    </ui>
  );
  const cartHasItem = cartCtx.items.length > 0 ? true : false;
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {cartHasItem && (
        <button ClassName={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );
  const cartModalContent = <React.Fragment>
    {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && <Checkout onConfirm={submitHandler} onCancel={props.onClose} />}
      {!isCheckout && modalActions}
  </React.Fragment>
  const submitingModalCartContent = <p>submiting your order</p>
  const didSubmitModalCartContent = <React.Fragment>
    <p>your order Confirmed !!!</p>
    <div className={classes.actions}>
      <button className={classes.button} onClick={props.onClose}>
        Close
      </button>
    </div>
  </React.Fragment>
  return (
    <Modal onClose={props.onClose}>
      {!isSubmiting && !didSubmit && cartModalContent}
      {isSubmiting && !didSubmit && submitingModalCartContent}
      {didSubmit && didSubmitModalCartContent}
    </Modal>
  );
};

export default Cart;
