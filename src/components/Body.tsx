import RestaurantCard, { withOffer } from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import { Restaurant } from "../utils/types";
import { RESTAURANT_API } from "../utils/constants";

// Higher Order Component to show offers
const RestaurantOffer = withOffer(RestaurantCard);

const Body = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [searchText, setSearchText] = useState("");
  const [showTopRated, setShowTopRated] = useState(false);

  const onlineStatus = useOnlineStatus();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Using AllOrigins proxy to bypass Swiggy's CORS/403 blocks on localhost
      const targetUrl = encodeURIComponent(RESTAURANT_API);
      const PROXY_URL = `https://api.allorigins.win/raw?url=${targetUrl}`;

      const response = await fetch(PROXY_URL);
      
      if (!response.ok) throw new Error("Network response was not ok");

      const json: any = await response.json();

      // DEBUG: Log this to see Swiggy's data structure in your console (F12)
      console.log("Swiggy Data Received:", json);

      // Robust path finding logic for Swiggy's dynamic card structure
      const resData = 
        json?.data?.cards?.find(
          (card: any) => card.card?.card?.gridElements?.infoWithStyle?.restaurants
        )?.card?.card?.gridElements?.infoWithStyle?.restaurants || 
        json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants || 
        json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants || 
        [];

      setRestaurants(resData as Restaurant[]);
    } catch (error) {
      console.error("Fetch Error for Yash Raj's App:", error);
    }
  };

  // useMemo prevents unnecessary re-filtering on every render
  const filteredRestaurants = useMemo(() => {
    let filtered = restaurants;

    if (searchText) {
      filtered = filtered.filter((res) =>
        res.info.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (showTopRated) {
      filtered = filtered.filter((res) => res.info.avgRating > 4.2);
    }

    return filtered;
  }, [restaurants, searchText, showTopRated]);

  // Offline UI
  if (!onlineStatus) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-orange-900 bg-orange-50">
        <h1 className="text-6xl mb-4">🔴</h1>
        <h2 className="text-3xl font-bold italic">You are offline, Yash Raj!</h2>
        <p className="mt-2">Please check your internet connection.</p>
      </div>
    );
  }

  // Loading State
  if (restaurants.length === 0) return <Shimmer />;

  return (
    <div className="Body bg-orange-50 min-h-screen pb-20">
      
      {/* Search and Filters Section */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-6 py-12">
        <div className="relative">
          <input
            type="text"
            placeholder="Search for your favorite food..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="border-2 border-orange-200 p-4 pl-8 w-96 rounded-full shadow-lg focus:outline-none focus:ring-4 focus:ring-orange-300 bg-white text-orange-900 transition-all"
          />
          <span className="absolute right-5 top-4 text-xl">🔍</span>
        </div>

        <button
          onClick={() => setShowTopRated(!showTopRated)}
          className={`px-10 py-4 rounded-full font-extrabold transition-all duration-300 shadow-lg ${
            showTopRated 
            ? "bg-orange-600 text-white ring-4 ring-orange-200" 
            : "bg-white text-orange-800 border-2 border-orange-200 hover:bg-orange-100"
          }`}
        >
          {showTopRated ? "Show All" : "Top Rated ★"}
        </button>
      </div>

      {/* Grid of Restaurant Cards */}
      <div className="flex flex-wrap justify-center gap-12 px-8 max-w-[1400px] mx-auto">
        {filteredRestaurants.map((restaurant) => (
          <Link
            key={restaurant.info.id}
            to={`/restaurants/${restaurant.info.id}`}
            className="transform hover:scale-95 transition-transform duration-300"
          >
            {/* Using HOC for conditional rendering of offers */}
            {restaurant.info.aggregatedDiscountInfoV3 ? (
              <RestaurantOffer resData={restaurant} />
            ) : (
              <RestaurantCard resData={restaurant} />
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;