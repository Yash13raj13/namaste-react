import { useEffect, useState } from "react";
import { MENU_API } from "../utils/constants";

export interface RestaurantMenu {
  id: string;
  name: string;
  price: number;
  description?: string;
  image?: string;
  
}

const useRestaurantMenu = (resId: number) => {
  const [resInfo, setResInfo] = useState<RestaurantMenu[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(MENU_API + resId);
        if (!response.ok) throw new Error("Failed to fetch menu");
        const json = await response.json();
        setResInfo(json.data?.menu || []); // adjust according to API shape
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [resId]);

  return { resInfo, loading, error };
};

export default useRestaurantMenu;
