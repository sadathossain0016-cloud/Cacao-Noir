export interface Product {
  id: string;
  name: string;
  subtitle: string;
  origin: string;
  cacaoPercentage: number;
  price: number;
  description: string;
  tastingNotes: string[];
  ingredients: string;
  weight: string;
  category: 'bars' | 'truffles' | 'boxes';
  image: string;
  featured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
