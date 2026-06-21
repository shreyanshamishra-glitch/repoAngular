import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import {
  AdminUser,
  ApiMetadata,
  GenerateDummyOrdersRequest,
  PageResponse,
} from '../models/api.model';
import { CreateOrderRequest, Order } from '../models/order.model';
import { Quote } from '../models/quote.model';

@Injectable({ providedIn: 'root' })
export class TradeApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiBaseUrl;

  getMetadata(): Observable<ApiMetadata> {
    return this.http.get<ApiMetadata>(`${this.baseUrl}/analysis/metadata`);
  }

  getAdminUser(): Observable<AdminUser> {
    return this.http.get<AdminUser>(`${this.baseUrl}/analysis/admin`);
  }

  getQuote(symbol: string): Observable<Quote> {
    const params = new HttpParams().set('symbol', symbol);
    return this.http.get<Quote>(`${this.baseUrl}/analysis/security/quote`, {
      params,
    });
  }

  listOrders(page = 0, size = 10): Observable<PageResponse<Order>> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size);
    return this.http.get<PageResponse<Order>>(`${this.baseUrl}/analysis/orders`, {
      params,
    });
  }

  createOrder(request: CreateOrderRequest): Observable<Order> {
    return this.http.post<Order>(`${this.baseUrl}/analysis/orders`, request);
  }

  generateDummyOrders(
    request: GenerateDummyOrdersRequest,
  ): Observable<Order[]> {
    return this.http.post<Order[]>(
      `${this.baseUrl}/analysis/orders/generate`,
      request,
    );
  }
}
