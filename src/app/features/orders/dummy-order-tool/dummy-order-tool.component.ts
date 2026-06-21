import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { OrderStoreService } from '../services/order-store.service';

@Component({
  selector: 'app-dummy-order-tool',
  imports: [FormsModule],
  templateUrl: './dummy-order-tool.component.html',
  styleUrl: './dummy-order-tool.component.css',
})
export class DummyOrderToolComponent {
  protected readonly store = inject(OrderStoreService);

  protected count = signal(5);
  protected useLiveQuotes = signal(true);

  protected async generate(): Promise<void> {
    const maxDummy = 25;
    const safeCount = Math.min(Math.max(this.count(), 1), maxDummy);

    await this.store.generateDummyOrders({
      count: safeCount,
      useLiveQuotes: this.useLiveQuotes(),
    });
  }
}
