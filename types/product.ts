export type ProductCategory = 
  | 'electronics'
  | 'clothing'
  | 'home'
  | 'beauty'
  | 'sports'
  | 'books'
  | 'toys'
  | 'jewelry';

export type ProductReview = {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  images: string[];
  category: ProductCategory;
  rating: number;
  reviewCount: number;
  reviews?: ProductReview[];
  inStock: boolean;
  features?: string[];
  specifications?: Record<string, string>;
  colors?: string[];
  sizes?: string[];
};

export type CartItem = {
  productId: string;
  quantity: number;
  color?: string;
  size?: string;
};

export type OrderStatus = 
  | 'pending'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled';

export type PaymentMethod = 
  | 'credit_card'
  | 'paypal'
  | 'apple_pay'
  | 'google_pay';

export type Order = {
  id: string;
  userId: string;
  items: CartItem[];
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
  shippingAddress: Address;
  paymentMethod: PaymentMethod;
  trackingNumber?: string;
};

export type Address = {
  fullName: string;
  streetAddress: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phoneNumber: string;
};