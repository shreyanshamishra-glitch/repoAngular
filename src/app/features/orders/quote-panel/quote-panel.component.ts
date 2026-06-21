import { CurrencyPipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import { Quote } from '../../../core/models/quote.model';
import { TradeApiService } from '../../../core/services/trade-api.service';
import { OrderStoreService } from '../services/order-store.service';

@Component({
  selector: 'app-quote-panel',
  imports: [CurrencyPipe],
  templateUrl: './quote-panel.component.html',
  styleUrl: './quote-panel.component.css',
})
export class QuotePanelComponent implements OnInit {
  private readonly api = inject(TradeApiService);
  private readonly store = inject(OrderStoreService);

  protected readonly quotes = signal<Quote[]>([]);
  protected readonly loading = signal(false);
  protected readonly error = signal<string | null>(null);
  protected readonly selectedSymbol = signal('IBM');

  ngOnInit(): void {
    void this.loadQuotes();
  }

  protected async loadQuotes(): Promise<void> {
    const symbols =
      this.store.metadata()?.defaultSymbols ?? ['IBM', 'MSFT', 'AAPL'];

    this.loading.set(true);
    this.error.set(null);
    this.quotes.set([]);

    try {
      const results: Quote[] = [];
      for (const symbol of symbols) {
        try {
          const quote = await firstValueFrom(this.api.getQuote(symbol));
          results.push(quote);
        } catch {
          // Alpha Vantage free tier may rate-limit; skip failed symbols.
        }
      }

      if (results.length === 0) {
        this.error.set('No live quotes returned. Check API key or rate limits.');
      } else {
        this.quotes.set(results);
        this.selectedSymbol.set(results[0].symbol);
      }
    } finally {
      this.loading.set(false);
    }
  }

  protected isPositive(changePercent: string): boolean {
    return !changePercent.startsWith('-');
  }

  protected parsePrice(price: string): number {
    return Number.parseFloat(price);
  }
}
