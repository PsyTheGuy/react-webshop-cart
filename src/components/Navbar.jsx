import { CartIcon } from "../icons";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { amount } = useSelector((state) => state.cart);

  return (
    <nav className="nav-center">
      <h3>redux toolkit</h3>
      <div className="nav-container">
        <CartIcon />
        {amount >= 1 && (
          <div className="amount-container">
            <p className="total-amount">{amount}</p>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
