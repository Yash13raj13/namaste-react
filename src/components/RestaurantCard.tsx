import { CDN_URL } from "../utils/constants";
import { Restaurant, MenuCategoryProps } from "../utils/types";

const RestaurantCard: React.FC<MenuCategoryProps> = ({ resData }) => {
  const { cloudinaryImageId, name, cuisines = [], avgRating, costForTwo, sla } =
    resData?.info || {};

  return (
    <div
      data-testid="resCard"
      className="res-card m-4 p-4 w-52 bg-fuchsia-100 border border-fuchsia-200 rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1.5"
    >
      <img
        className="res-logo rounded-lg h-36 w-full object-cover"
        alt={name}
        src={cloudinaryImageId ? CDN_URL + cloudinaryImageId : ""}
      />
      <h3 className="font-bold py-2 text-lg">{name}</h3>
      <h4 className="text-sm text-gray-700">{cuisines.join(", ")}</h4>
      <h4 className="text-sm">{avgRating ?? "N/A"} ⭐</h4>
      <h4 className="text-sm">{costForTwo ?? "N/A"}</h4>
      <h4 className="text-sm">{sla?.deliveryTime ?? "-"} min</h4>
    </div>
  );
};

// ✅ Higher Order Component
export const withOffer = (WrappedCard: React.FC<MenuCategoryProps>) => {
  return ({ resData }: MenuCategoryProps) => {
    const offer = resData?.info?.aggregatedDiscountInfoV3;

    return (
      <div className="relative">
        {offer?.header && (
          <label className="absolute z-10 top-2 left-2 bg-red-900 text-amber-50 rounded-xl px-3 py-1 font-semibold shadow">
            {offer.header} {offer.subHeader ? ` - ${offer.subHeader}` : ""}
          </label>
        )}
        <WrappedCard resData={resData} />
      </div>
    );
  };
};

export default RestaurantCard;
