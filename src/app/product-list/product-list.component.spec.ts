import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ApiService } from '../api.service';
import { ProductListComponent } from './product-list.component';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../product-card/product-card.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let apiService: jasmine.SpyObj<ApiService>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [
        ProductListComponent,
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        ProductCardComponent,
        HttpClientTestingModule
      ],
      providers: [ApiService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update currentPage$ when setPage is called', () => {
    const pageNumber = 3;

    component.setPage({ target: { value: pageNumber } });

    component.currentPage$.subscribe((currentPage) => {
      expect(currentPage).toEqual(pageNumber);
    });
  });

  it('should increment currentPage$ when nextPage is called', () => {
    component.currentPage$.next(2);

    component.nextPage();

    component.currentPage$.subscribe((currentPage) => {
      expect(currentPage).toEqual(2);
    });
  });

  it('should decrement currentPage$ when previousPage is called', () => {
    component.currentPage$.next(2);

    component.previousPage();

    component.currentPage$.subscribe((currentPage) => {
      expect(currentPage).toEqual(1);
    });
  });
});
