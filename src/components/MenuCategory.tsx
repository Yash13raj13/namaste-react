import MenuItemList from "./MenuItemList";
import { MenuCategoryProps } from "../utils/types";

const MenuCategory = ({ data, showItems, setShowIndex, index }: MenuCategoryProps) => {

  // Toggle show/hide category
  const handleToggle = () => {
    setShowIndex(prev => (prev === index ? null : index));
  };

  if (!data) return null; // safety check

  return (
    <div className="w-6/12 mx-auto my-4 bg-gray-100 shadow-lg rounded-lg">
      {/* Category Header */}
      <div
        className="flex justify-between items-center cursor-pointer p-4 hover:bg-gray-200 transition"
        onClick={handleToggle}
      >
        <span className="font-bold text-lg">
          {data.title} ({data.itemCards?.length ?? 0})
        </span>
        <span className={`transform transition-transform ${showItems ? "rotate-180" : ""}`}>
          🔽
        </span>
      </div>

      {/* Category Items */}
      {showItems && <MenuItemList items={data.itemCards ?? []} />}
    </div>
  );
};

export default MenuCategory;
