import { Injectable, computed, signal } from '@angular/core';

import { MOCK_ORDERS } from '../../../core/constants/mock-orders.constants';
import {
  CreateOrderRequest,
  Order,
  OrderStatus,
} from '../../../core/models/order.model';

/**
 * In-memory order store — think of this as a @Service singleton that owns
 * application state. Signals replace RxJS BehaviorSubject for synchronous,
 * fine-grained reactivity (similar to holding state in a Spring bean field
 * and notifying the UI when it changes).
 */
@Injectable({ providedIn: 'root' })
export class OrderStoreService {
  private readonly ordersState = signal<Order[]>([...MOCK_ORDERS]);
  private idSequence = 1006;

  /** Read-only view of orders — consumers cannot mutate the signal directly. */
  readonly orders = this.ordersState.asReadonly();

  readonly totalOrders = computed(() => this.orders().length);

  readonly pendingOrders = computed(
    () => this.orders().filter((o) => o.status === 'PENDING').length,
  );

  readonly completedOrders = computed(
    () => this.orders().filter((o) => o.status === 'COMPLETED').length,
  );

  readonly rejectedOrders = computed(
    () => this.orders().filter((o) => o.status === 'REJECTED').length,
  );

  addOrder(request: CreateOrderRequest): void {
    const status = this.resolveStatus(request);
    const order: Order = {
      id: `ORD-${this.idSequence++}`,
      securityName: request.securityName,
      side: request.side,
      quantity: request.quantity,
      price: request.price,
      status,
      timestamp: new Date(),
    };

    this.ordersState.update((orders) => [order, ...orders]);
  }

  private resolveStatus(request: CreateOrderRequest): OrderStatus {
    if (request.quantity <= 0 || request.price <= 0) {
      return 'REJECTED';
    }
    return 'PENDING';
  }
}
