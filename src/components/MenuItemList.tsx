import { CDN_URL } from "../utils/constants";
import { ItemListProps, ItemType } from "../utils/types";
import { useDispatch } from "react-redux";
import { addItem } from "../utils/cartSlice";

const MenuItemList = ({ items }: ItemListProps) => {
  const dispatch = useDispatch();

  const handleAddItem = (item: ItemType) => {
    dispatch(addItem(item));
  };

  return (
    <div className="space-y-4">
      {items.map((item) => {
        const { id, name, price, imageId } = item.card.info;
        const displayPrice = (price?? 0) / 100;

        return (
          <div
            data-testid="foodItems"
            key={id}
            className="flex justify-between items-center p-2 border-b border-gray-300"
          >
            {/* Item Info */}
            <div className="flex-1 pr-4">
              <div className="font-serif text-lg">
                {name} - ₹{displayPrice}
              </div>
              <p className="text-sm text-gray-600">{description}</p>
            </div>

            {/* Image + Add Button */}
            <div className="flex flex-col items-center space-y-2 w-40">
              <img
                src={CDN_URL + imageId}
                alt={name}
                className="w-24 h-24 object-cover rounded-md"
              />
              <button
                onClick={() => handleAddItem(item)}
                className="px-4 py-1 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
              >
                ADD +
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MenuItemList;
