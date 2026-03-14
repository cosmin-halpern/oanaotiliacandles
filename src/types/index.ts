import type { Candle, Category, Order, OrderItem, OrderStatus } from "@prisma/client";

export type CandleWithCategory = Candle & {
  category: Category | null;
};

export type OrderWithItems = Order & {
  items: (OrderItem & {
    candle: Candle;
  })[];
};

export type CartItem = {
  candleId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  stock: number;
};

export type Cart = {
  items: CartItem[];
  total: number;
};

export { OrderStatus };