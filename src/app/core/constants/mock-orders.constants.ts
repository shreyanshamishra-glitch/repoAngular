import { Order } from '../models/order.model';

/** Seed data — stands in for a Spring @Repository findAll() until the API exists. */
export const MOCK_ORDERS: Order[] = [
  {
    id: 'ORD-1001',
    securityName: 'RELIANCE',
    side: 'BUY',
    quantity: 50,
    price: 2845.75,
    status: 'COMPLETED',
    timestamp: new Date('2026-05-30T09:12:00'),
  },
  {
    id: 'ORD-1002',
    securityName: 'TCS',
    side: 'SELL',
    quantity: 25,
    price: 4120.0,
    status: 'PENDING',
    timestamp: new Date('2026-05-30T09:18:30'),
  },
  {
    id: 'ORD-1003',
    securityName: 'INFY',
    side: 'BUY',
    quantity: 100,
    price: 1892.5,
    status: 'PENDING',
    timestamp: new Date('2026-05-30T09:22:15'),
  },
  {
    id: 'ORD-1004',
    securityName: 'HDFCBANK',
    side: 'SELL',
    quantity: 10,
    price: 0,
    status: 'REJECTED',
    timestamp: new Date('2026-05-30T08:55:00'),
  },
  {
    id: 'ORD-1005',
    securityName: 'ICICIBANK',
    side: 'BUY',
    quantity: 75,
    price: 1185.25,
    status: 'COMPLETED',
    timestamp: new Date('2026-05-30T08:40:00'),
  },
];
