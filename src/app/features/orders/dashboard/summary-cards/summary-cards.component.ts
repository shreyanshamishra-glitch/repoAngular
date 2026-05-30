import { Component, inject } from '@angular/core';

import { OrderStoreService } from '../../services/order-store.service';

interface SummaryCard {
  label: string;
  value: () => number;
  accent: string;
}

@Component({
  selector: 'app-summary-cards',
  templateUrl: './summary-cards.component.html',
  styleUrl: './summary-cards.component.css',
})
export class SummaryCardsComponent {
  protected readonly store = inject(OrderStoreService);

  protected readonly cards: SummaryCard[] = [
    {
      label: 'Total Orders',
      value: () => this.store.totalOrders(),
      accent: 'card-total',
    },
    {
      label: 'Pending Orders',
      value: () => this.store.pendingOrders(),
      accent: 'card-pending',
    },
    {
      label: 'Completed Orders',
      value: () => this.store.completedOrders(),
      accent: 'card-completed',
    },
    {
      label: 'Rejected Orders',
      value: () => this.store.rejectedOrders(),
      accent: 'card-rejected',
    },
  ];
}
