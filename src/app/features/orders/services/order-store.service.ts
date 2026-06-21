import { Injectable, computed, inject, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import { TradeApiService } from '../../../core/services/trade-api.service';
import {
  ApiMetadata,
  GenerateDummyOrdersRequest,
} from '../../../core/models/api.model';
import {
  CreateOrderRequest,
  Order,
} from '../../../core/models/order.model';

@Injectable({ providedIn: 'root' })
export class OrderStoreService {
  private readonly api = inject(TradeApiService);

  private readonly ordersState = signal<Order[]>([]);
  private readonly loadingState = signal(false);
  private readonly errorState = signal<string | null>(null);
  private readonly pageSizeState = signal(10);
  private readonly maxPageSizeState = signal(50);
  private readonly metadataState = signal<ApiMetadata | null>(null);

  readonly orders = this.ordersState.asReadonly();
  readonly loading = this.loadingState.asReadonly();
  readonly error = this.errorState.asReadonly();
  readonly pageSize = this.pageSizeState.asReadonly();
  readonly maxPageSize = this.maxPageSizeState.asReadonly();
  readonly metadata = this.metadataState.asReadonly();

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

  async initialize(): Promise<void> {
    await Promise.all([this.loadMetadata(), this.refreshOrders()]);
  }

  async loadMetadata(): Promise<void> {
    try {
      const metadata = await firstValueFrom(this.api.getMetadata());
      this.metadataState.set(metadata);
      this.pageSizeState.set(metadata.pagination.defaultPageSize);
      this.maxPageSizeState.set(metadata.pagination.maxPageSize);
    } catch {
      this.errorState.set('Unable to load API metadata from TradeSim backend.');
    }
  }

  async refreshOrders(): Promise<void> {
    this.loadingState.set(true);
    this.errorState.set(null);

    try {
      const response = await firstValueFrom(
        this.api.listOrders(0, this.pageSizeState()),
      );
      this.ordersState.set(
        response.content.map((order) => ({
          ...order,
          timestamp: new Date(order.timestamp),
        })),
      );
      this.maxPageSizeState.set(response.maxPageSize);
    } catch {
      this.errorState.set('Unable to load orders. Is the backend running on port 8080?');
    } finally {
      this.loadingState.set(false);
    }
  }

  async addOrder(request: CreateOrderRequest): Promise<void> {
    this.loadingState.set(true);
    this.errorState.set(null);

    try {
      const created = await firstValueFrom(this.api.createOrder(request));
      const order: Order = {
        ...created,
        timestamp: new Date(created.timestamp),
      };
      this.ordersState.update((orders) => [order, ...orders]);
    } catch {
      this.errorState.set('Failed to submit order.');
    } finally {
      this.loadingState.set(false);
    }
  }

  async generateDummyOrders(request: GenerateDummyOrdersRequest): Promise<void> {
    this.loadingState.set(true);
    this.errorState.set(null);

    try {
      const created = await firstValueFrom(this.api.generateDummyOrders(request));
      const normalized = created.map((order) => ({
        ...order,
        timestamp: new Date(order.timestamp),
      }));
      this.ordersState.update((orders) => [...normalized, ...orders]);
    } catch {
      this.errorState.set('Failed to generate dummy orders.');
    } finally {
      this.loadingState.set(false);
    }
  }
}
