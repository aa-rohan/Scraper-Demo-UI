import { Component, Input, inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject, Observable, combineLatest, debounceTime, distinctUntilChanged, map, of, startWith, switchMap, tap } from 'rxjs';
import { ApiService } from '../api.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductCardComponent } from '../product-card/product-card.component';
import { Category, Product } from '../shared/interfaces/interfaces';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe, RouterModule, FormsModule, CommonModule, ProductCardComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
  private api: ApiService = inject(ApiService);

  private perPage: number = 20;

  products$: Observable<Product[]> = new Observable();
  categories$: Observable<Category[]> = of([]);
  currentPage$ = new BehaviorSubject<number>(1);

  totalPages: number = 1;
  searchControl: FormControl<any> = new FormControl(null);
  categoryControl: FormControl<any>  = new FormControl(null);

  ngOnInit(): void {
    this.fetchProducts();
    this.fetchCategories();

    this.products$ = combineLatest([
      this.searchControl.valueChanges.pipe(
        startWith(null),
        debounceTime(300),
        distinctUntilChanged(),
        tap(() => this.currentPage$.next(1))
      ),
      this.categoryControl.valueChanges.pipe(
        startWith(null),
        debounceTime(300),
        distinctUntilChanged(),
        tap(() => this.currentPage$.next(1))
      ),
      this.currentPage$.pipe(
        startWith(1)
      )
    ]).pipe(
      switchMap(([searchTerm, category, currentPage]) =>
        this.api.fetchProducts(searchTerm, category, currentPage).pipe(
          map((data: any) => {
            this.totalPages = data.total_pages;
            return data.products;
          })
        )
      )
    );
  }

  clearCategory(): void {
    this.categoryControl.setValue(null);
  }

  fetchProducts(): void {
    this.products$ = this.api.fetchProducts(null, null, this.currentPage$.value, this.perPage);
  }

  fetchCategories(): void {
    this.categories$ = this.api.fetchCategories();
  }

  setPage(event: any): void {
    this.currentPage$.next(Number(event.target.value));
  }

  nextPage(): void {
    const currentPage = this.currentPage$.getValue();
    if (currentPage < this.totalPages) {
      this.currentPage$.next(currentPage + 1);
    }
  }

  previousPage(): void {
    const currentPage = this.currentPage$.getValue();
    if (currentPage > 1) {
      this.currentPage$.next(currentPage - 1);
    }
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
}
