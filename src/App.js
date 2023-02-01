import CartContainer from "./components/CartContainer";
import Navbar from "./components/Navbar";
import Modal from "./components/Modal";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { calculateCartTotal, getCartItems } from "./features/cart/cartSlice";

function App() {
  const { cartItems, isLoading } = useSelector((state) => state.cart);
  const { isOpen } = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calculateCartTotal());
  }, [cartItems]); //eslint-disable-line

  useEffect(() => {
    dispatch(getCartItems());
  }, []); //eslint-disable-line

  return isLoading ? (
    <div className="loading">
      <h1>Loading...</h1>
    </div>
  ) : (
    <>
      {isOpen ? <Modal /> : null}
      <Navbar />
      <CartContainer />
    </>
  );
}
export default App;
