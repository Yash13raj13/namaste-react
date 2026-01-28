import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../utils/appStore";

import ItemList from "./MenuItemList";
import { clearCart } from "../utils/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();

  // ✅ Proper typing
  const cartItems = useSelector((store: RootState) => store.cart.items);

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const isEmpty = cartItems.length === 0;

  return (
    <div className="text-center m-6 p-6">
      <h1 className="text-3xl font-bold mb-4">
        Cart ({cartItems.length})
      </h1>

      <div className="w-8/12 m-auto bg-gray-50 shadow-lg rounded-xl p-4">
        {!isEmpty && (
          <button
            onClick={handleClearCart}
            className="p-2 px-4 mb-4 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
          >
            Clear Cart
          </button>
        )}

        {isEmpty ? (
          <h2 className="text-gray-500">
            Cart is empty. Add items to the cart!
          </h2>
        ) : (
          <ItemList items={cartItems} />
        )}
      </div>
    </div>
  );
};

export default Cart;
