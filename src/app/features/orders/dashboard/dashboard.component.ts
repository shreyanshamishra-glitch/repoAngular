import { Component } from '@angular/core';

import { OrderEntryComponent } from '../order-entry/order-entry.component';
import { OrderListComponent } from '../order-list/order-list.component';
import { SummaryCardsComponent } from './summary-cards/summary-cards.component';

@Component({
  selector: 'app-dashboard',
  imports: [SummaryCardsComponent, OrderEntryComponent, OrderListComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {}
