import RestaurantCard, { withPromotedLabel } from "./RestaurantCard";
import { useEffect, useState, useContext, useMemo } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";

/* ---------------- TYPES ---------------- */
interface Restaurant {
  info: {
    id: string;
    name: string;
    avgRating: number;
    isOpen: boolean;
  };
}

/* ---------------- CONSTANTS ---------------- */
const API_URL =
  "https://foodfire.onrender.com/api/restaurants?lat=21.1702401&lng=72.83106070000001&page_type=DESKTOP_WEB_LISTING";

const TOP_RATING = 4.2;

/* ---------------- COMPONENT ---------------- */
const Body: React.FC = () => {
  const [restaurantList, setRestaurantList] = useState<Restaurant[]>([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);

  const { loggedInUser, setUserName } = useContext(UserContext);

  const isOnline = useOnlineStatus();

  const RestaurantCardWithPromotedLabel = withPromotedLabel(RestaurantCard);

  /* ---------------- FETCH DATA ---------------- */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(API_URL);
        const json = await res.json();

        const restaurants =
          json?.data?.cards?.[4]?.card?.card?.gridElements?.infoWithStyle
            ?.restaurants ?? [];

        setRestaurantList(restaurants);
      } catch (err) {
        console.error("Failed to fetch restaurants:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  /* ---------------- FILTERED LIST (Memoized) ---------------- */
  const filteredRestaurants = useMemo(() => {
    return restaurantList.filter((res) =>
      res.info.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [restaurantList, searchText]);

  /* ---------------- HANDLERS ---------------- */
  const handleTopRated = () => {
    const top = restaurantList.filter(
      (res) => res.info.avgRating > TOP_RATING
    );
    setRestaurantList(top);
  };

  /* ---------------- UI STATES ---------------- */
  if (!isOnline) {
    return (
      <div className="offline-status">
        <h1>You are offline 😔</h1>
      </div>
    );
  }

  if (loading) return <Shimmer />;

  /* ---------------- RENDER ---------------- */
  return (
    <div className="body">
      <div className="subHeader">
        {/* Top Rated */}
        <button className="filterbtn" onClick={handleTopRated}>
          Top Rated Restaurant
        </button>

        {/* Username */}
        <input
          className="border-black"
          type="text"
          value={loggedInUser}
          onChange={(e) => setUserName?.(e.target.value)}
          placeholder="Tell me Who Are U?"
        />

        {/* Search */}
        <input
          type="text"
          value={searchText}
          placeholder="Search restaurants..."
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      <div className="restaurant-container">
        {filteredRestaurants.map((restaurant) => {
          const CardComponent = restaurant.info.isOpen
            ? RestaurantCardWithPromotedLabel
            : RestaurantCard;

          return (
            <Link
              key={restaurant.info.id}
              to={`/restaurants/${restaurant.info.id}`}
            >
              <CardComponent resdata={restaurant} />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Body;
