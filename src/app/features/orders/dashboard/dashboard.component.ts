import { Component, inject, OnInit, signal } from '@angular/core';

import { AdminUser } from '../../../core/models/api.model';
import { TradeApiService } from '../../../core/services/trade-api.service';
import { ApiEndpointsPanelComponent } from '../api-endpoints-panel/api-endpoints-panel.component';
import { DummyOrderToolComponent } from '../dummy-order-tool/dummy-order-tool.component';
import { OrderEntryComponent } from '../order-entry/order-entry.component';
import { OrderListComponent } from '../order-list/order-list.component';
import { QuotePanelComponent } from '../quote-panel/quote-panel.component';
import { OrderStoreService } from '../services/order-store.service';
import { SummaryCardsComponent } from './summary-cards/summary-cards.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    SummaryCardsComponent,
    QuotePanelComponent,
    ApiEndpointsPanelComponent,
    OrderEntryComponent,
    DummyOrderToolComponent,
    OrderListComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  private readonly api = inject(TradeApiService);

  protected readonly store = inject(OrderStoreService);
  protected readonly adminUser = signal<AdminUser | null>(null);

  ngOnInit(): void {
    void this.bootstrap();
  }

  private async bootstrap(): Promise<void> {
    await this.store.initialize();
    this.api.getAdminUser().subscribe({
      next: (user) => this.adminUser.set(user),
      error: () => this.adminUser.set({
        username: 'admin',
        role: 'ADMIN',
        displayName: 'Demo Admin',
      }),
    });
  }
}
