import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:3000';
  private http: HttpClient = inject(HttpClient);

  scrapeProduct(productUrl: string | null): Observable<any> {
    let url = `${this.baseUrl}/scrape_product`;
    return this.http.post<any[]>(url, {url: productUrl});
  }

  fetchProduct(id: string | null): Observable<any> {
    let url = `${this.baseUrl}/products/${id}`;
    return this.http.get<any[]>(url);
  }

  fetchProducts(
    searchTerm: string | null = null,
    category: string | null = null,
    pageNumber: number = 1,
    perPage: number = 5,
    orderBy: string = 'id',
    orderDirection: string = 'asc'
  ): Observable<any> {
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
    return this.http.get<any[]>(url, {params});
  }

  fetchCategories(searchTerm: string | null = null): Observable<any[]> {
    const params: any = {}
    let url = `${this.baseUrl}/categories`;
    if (searchTerm) {
      params.search = searchTerm;
    }
    return this.http.get<any[]>(url, {params});
  }
}
