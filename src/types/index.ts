export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'fruits' | 'vegetables' | 'packaged' | 'dairy' | 'bakery' | 'beverages' | 'snacks' | 'organic';
  image: string;
  rating: number;
  description: string;
  comments: Comment[];
  sales: number;
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  text: string;
  date: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  password: string;
  orders: Order[];
}

export interface Address {
  recipientName: string;
  mobileNumber: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  address: Address;
  paymentMethod: 'credit_card' | 'debit_card' | 'paypal' | 'cod';
  status: 'pending' | 'confirmed' | 'delivered';
  deliveryTime: string;
  createdAt: string;
  trackingCode: string;
}