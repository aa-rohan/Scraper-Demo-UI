import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';
import { AsyncPipe } from '@angular/common';
import { ProductListComponent } from '../product-list/product-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AsyncPipe, ProductListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private api: ApiService = inject(ApiService)
  products$: Observable<any[]> = new Observable();

  ngOnInit() {
    this.fetchProducts();
  }

  fetchProducts() {
    this.products$ = this.api.fetchProducts();
  }
}
