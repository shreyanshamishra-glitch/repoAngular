import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { firstValueFrom } from 'rxjs';

import { SECURITIES } from '../../../core/constants/securities.constants';
import { OrderSide } from '../../../core/models/order.model';
import { TradeApiService } from '../../../core/services/trade-api.service';
import { OrderStoreService } from '../services/order-store.service';

@Component({
  selector: 'app-order-entry',
  imports: [ReactiveFormsModule],
  templateUrl: './order-entry.component.html',
  styleUrl: './order-entry.component.css',
})
export class OrderEntryComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly store = inject(OrderStoreService);
  private readonly api = inject(TradeApiService);

  protected readonly sides: OrderSide[] = ['BUY', 'SELL'];
  protected quoteLoading = false;
  protected quoteHint: string | null = null;

  protected readonly form = this.fb.nonNullable.group({
    securityName: [SECURITIES[0], Validators.required],
    side: ['BUY' as OrderSide, Validators.required],
    quantity: [1, [Validators.required, Validators.min(1)]],
    price: [0, [Validators.required, Validators.min(0.01)]],
  });

  ngOnInit(): void {
    this.form.controls.securityName.valueChanges.subscribe((symbol) => {
      void this.loadQuoteForSymbol(symbol);
    });
    void this.loadQuoteForSymbol(this.form.controls.securityName.value);
  }

  protected securities(): readonly string[] {
    return this.store.metadata()?.defaultSymbols ?? SECURITIES;
  }

  protected async loadQuoteForSymbol(symbol: string): Promise<void> {
    this.quoteLoading = true;
    this.quoteHint = null;

    try {
      const quote = await firstValueFrom(this.api.getQuote(symbol));
      this.form.patchValue({ price: Number.parseFloat(quote.price) });
      this.quoteHint = `Live: ${quote.price} (${quote.changePercent})`;
    } catch {
      this.quoteHint = 'Live quote unavailable — enter price manually';
    } finally {
      this.quoteLoading = false;
    }
  }

  protected async submit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    await this.store.addOrder(this.form.getRawValue());
    this.form.patchValue({ quantity: 1 });
    await this.loadQuoteForSymbol(this.form.controls.securityName.value);
    this.form.markAsPristine();
  }
}
