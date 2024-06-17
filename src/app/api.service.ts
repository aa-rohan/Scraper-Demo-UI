import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category, Product } from './shared/interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:3000';
  private http: HttpClient = inject(HttpClient);

  scrapeProduct(productUrl: string | null): Observable<{data: Product}> {
    let url = `${this.baseUrl}/scrape_product`;
    return this.http.post<{data: Product}>(url, {url: productUrl});
  }

  fetchProduct(id: string | number | null): Observable<Product> {
    let url = `${this.baseUrl}/products/${id}`;
    return this.http.get<Product>(url);
  }

  fetchProducts(
    searchTerm: string | null = null,
    category: string | null = null,
    pageNumber: number = 1,
    perPage: number = 5,
    orderBy: string = 'id',
    orderDirection: string = 'asc'
  ): Observable<{products: Product[], total_pages: number}> {
    let url = `${this.baseUrl}/products`;
    let params = new HttpParams()
      .set('page_number', pageNumber.toString())
      .set('per_page', perPage.toString())
      .set('order_by', orderBy)
      .set('order_direction', orderDirection);
    if (searchTerm) {
      params = params.set('search', searchTerm);
    }
    if (category) {
      params = params.set('category', category);
    }
    return this.http.get<{products: Product[], total_pages: number}>(url, {params});
  }

  fetchCategories(searchTerm: string | null = null): Observable<Category[]> {
    const params: any = {}
    let url = `${this.baseUrl}/categories`;
    if (searchTerm) {
      params.search = searchTerm;
    }
    return this.http.get<Category[]>(url, {params});
  }
}
