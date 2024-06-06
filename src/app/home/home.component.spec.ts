import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let apiService: ApiService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent, FormsModule, HttpClientTestingModule],
      providers: [ApiService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call scrapeProduct on ApiService and navigate on successful scrape', () => {
    const productUrl = 'http://example.com/product/123';
    const mockProduct = { data: { id: '123' } };

    spyOn(apiService, 'scrapeProduct').and.returnValue(of(mockProduct));
    spyOn(router, 'navigate').and.stub();

    component.productUrl = productUrl;
    component.scrape();

    expect(apiService.scrapeProduct).toHaveBeenCalledWith(productUrl);
    expect(router.navigate).toHaveBeenCalledWith(['/product', '123']);
  });

  it('should not call scrapeProduct on ApiService if productUrl is not set', () => {
    spyOn(apiService, 'scrapeProduct').and.stub();
    spyOn(router, 'navigate').and.stub();

    component.productUrl = null;
    component.scrape();

    expect(apiService.scrapeProduct).not.toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalled();
  });
});
