export interface Restaurant {
  info: {
    id: string;
    cloudinaryImageId: string;
    name: string;
    cuisines: string[];
    avgRating: number;
    costForTwo: string;
    sla: {
      deliveryTime: number;
    };
    totalRatingsString?: string; // Made optional
    aggregatedDiscountInfoV3?: { // Made optional because not all restaurants have offers
      header?: string;
      subHeader?: string;
    };
  };
}

// Menu and Accordion Types
export interface MenuCategoryData {
  title?: string;
  itemCards?: any[];
}

export interface MenuCategoryProps {
  data: MenuCategoryData;
  index: number;
  showItems: boolean;
  setShowIndex: React.Dispatch<React.SetStateAction<number | null>>;
}

// Item List Types (Used for Cart and Menu)
export interface MenuItem {
  card: {
    info: {
      id: string;
      name: string;
      price?: number;      // Price is in paise
      defaultPrice?: number; // Some items use defaultPrice instead
      description?: string;
      imageId?: string;
    };
  };
}

export interface ItemListProps {
  items: MenuItem[];
}

// Redux Cart Types
export interface CartItem {
  id: string;
  name: string;
  price: number;
  imageId?: string;
  description?: string;
}

export interface CartState {
  items: CartItem[];
}