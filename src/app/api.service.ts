import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:3000';
  private http: HttpClient = inject(HttpClient);

  fetchProducts(searchTerm: string | null = null, category: string | null = null): Observable<any[]> {
    const params: any = {}
    let url = `${this.baseUrl}/products`;
    if (searchTerm) {
      params.search = searchTerm;
    }
    if (category) {
      params.category = category;
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
