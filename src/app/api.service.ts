import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:3000';
  private http: HttpClient = inject(HttpClient);

  fetchProducts(): Observable<any[]> {
    const url = `${this.baseUrl}/products`;
    return this.http.get<any[]>(url);
  }
}
