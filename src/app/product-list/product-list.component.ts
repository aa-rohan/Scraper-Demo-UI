import { Component, Input, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Observable, combineLatest, debounceTime, distinctUntilChanged, of, startWith, switchMap } from 'rxjs';
import { ApiService } from '../api.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
  private api: ApiService = inject(ApiService);

  products$: Observable<any[]> = new Observable();
  categories$: Observable<any[]> = of([]);

  searchControl = new FormControl(null);
  categoryControl = new FormControl(null);

  ngOnInit() {
    this.fetchProducts();
    this.fetchCategories();

    this.products$ = combineLatest([
      this.searchControl.valueChanges.pipe(
        startWith(null),
        debounceTime(300),
        distinctUntilChanged()
      ),
      this.categoryControl.valueChanges.pipe(
        startWith(null),
        debounceTime(300),
        distinctUntilChanged()
      )
    ]).pipe(
      switchMap(([searchTerm, category]) =>
        this.api.fetchProducts(searchTerm, category)
      )
    );
  }

  fetchProducts() {
    this.products$ = this.api.fetchProducts();
  }

  fetchCategories() {
    this.categories$ = this.api.fetchCategories();
  }
}
