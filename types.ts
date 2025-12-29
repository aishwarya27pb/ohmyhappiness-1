
export interface Product {
  id: string;
  name: string;
  price: number;
  category: 
    | 'Wellness' 
    | 'Electronics' 
    | 'Food & Beverage' 
    | 'Stationery' 
    | 'Apparel' 
    | 'Employee Welcome Kits' 
    | 'Client Gifts' 
    | 'Eco-Friendly Gifts' 
    | 'Employee Gifts' 
    | 'Drinkware' 
    | 'Promotional Products' 
    | 'Custom';
  description: string;
  image: string;
  rating: number;
  isCustomizable: boolean;
  colors?: string[];
  inStock: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  company: string;
  role: 'admin' | 'buyer';
}

export interface CartItem extends Product {
  quantity: number;
  selectedColor?: string;
  customLogo?: string;
  giftMessage?: string;
}

export interface RecommendationRequest {
  occasion: string;
  budget: string;
  recipientCount: string;
  tone: string;
}
