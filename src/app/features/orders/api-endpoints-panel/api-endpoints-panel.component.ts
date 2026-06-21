import { KeyValuePipe } from '@angular/common';
import { Component, inject } from '@angular/core';

import { OrderStoreService } from '../services/order-store.service';

@Component({
  selector: 'app-api-endpoints-panel',
  imports: [KeyValuePipe],
  templateUrl: './api-endpoints-panel.component.html',
  styleUrl: './api-endpoints-panel.component.css',
})
export class ApiEndpointsPanelComponent {
  protected readonly store = inject(OrderStoreService);
}
