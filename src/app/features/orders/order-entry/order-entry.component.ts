import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { SECURITIES } from '../../../core/constants/securities.constants';
import { OrderSide } from '../../../core/models/order.model';
import { OrderStoreService } from '../services/order-store.service';

@Component({
  selector: 'app-order-entry',
  imports: [ReactiveFormsModule],
  templateUrl: './order-entry.component.html',
  styleUrl: './order-entry.component.css',
})
export class OrderEntryComponent {
  private readonly fb = inject(FormBuilder);
  private readonly store = inject(OrderStoreService);

  protected readonly securities = SECURITIES;
  protected readonly sides: OrderSide[] = ['BUY', 'SELL'];

  protected readonly form = this.fb.nonNullable.group({
    securityName: [SECURITIES[0], Validators.required],
    side: ['BUY' as OrderSide, Validators.required],
    quantity: [1, [Validators.required, Validators.min(1)]],
    price: [0, [Validators.required, Validators.min(0.01)]],
  });

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.store.addOrder(this.form.getRawValue());
    this.form.patchValue({ quantity: 1, price: 0 });
    this.form.markAsPristine();
  }
}
