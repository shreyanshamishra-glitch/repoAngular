import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';

import { OrderStatus } from '../../../core/models/order.model';
import { OrderStoreService } from '../services/order-store.service';

@Component({
  selector: 'app-order-list',
  imports: [DatePipe, CurrencyPipe],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.css',
})
export class OrderListComponent {
  protected readonly store = inject(OrderStoreService);

  protected statusClass(status: OrderStatus): string {
    switch (status) {
      case 'PENDING':
        return 'status-pending';
      case 'COMPLETED':
        return 'status-completed';
      case 'REJECTED':
        return 'status-rejected';
    }
  }
}
