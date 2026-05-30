/** Trade side — analogous to BUY/SELL enums in a Java trading API. */
export type OrderSide = 'BUY' | 'SELL';

/** Lifecycle state — maps to order states in an OMS backend. */
export type OrderStatus = 'PENDING' | 'COMPLETED' | 'REJECTED';

/** Domain entity — like a JPA @Entity or DTO returned from Spring REST. */
export interface Order {
  id: string;
  securityName: string;
  side: OrderSide;
  quantity: number;
  price: number;
  status: OrderStatus;
  timestamp: Date;
}

/** Payload for creating a new order — like a @RequestBody command object. */
export interface CreateOrderRequest {
  securityName: string;
  side: OrderSide;
  quantity: number;
  price: number;
}
