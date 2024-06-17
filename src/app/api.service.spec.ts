import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;
  const baseUrl = 'http://localhost:3000';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call scrapeProduct with correct URL', () => {
    const dummyResponse = {data: { id: 1, title: 'Product A', price_amount: '123' }};
    const productUrl = 'http://example.com/product';

    service.scrapeProduct(productUrl).subscribe(response => {
      expect(response).toEqual(dummyResponse);
    });

    const req = httpMock.expectOne(`${baseUrl}/scrape_product`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ url: productUrl });
    req.flush(dummyResponse);
  });

  it('should call fetchProduct with correct URL', () => {
    const dummyProduct = { id: 1, title: 'Product A', price_amount: '123'};
    const productId = '1';

    service.fetchProduct(productId).subscribe(product => {
      expect(product).toEqual(dummyProduct);
    });

    const req = httpMock.expectOne(`${baseUrl}/products/${productId}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyProduct);
  });

  it('should call fetchProducts with correct params', () => {
    const dummyProducts = [{ id: 1, title: 'Product A', price_amount: '123123' }];
    const searchTerm = 'test';
    const category = 'electronics';
    const pageNumber = 1;
    const perPage = 5;
    const orderBy = 'id';
    const orderDirection = 'asc';

    service.fetchProducts(searchTerm, category, pageNumber, perPage, orderBy, orderDirection).subscribe(products => {
      expect(products).toEqual(dummyProducts);
    });

    const req = httpMock.expectOne(request =>
      request.url === `${baseUrl}/products` &&
      request.params.get('search') === searchTerm &&
      request.params.get('category') === category &&
      request.params.get('page_number') === pageNumber.toString() &&
      request.params.get('per_page') === perPage.toString() &&
      request.params.get('order_by') === orderBy &&
      request.params.get('order_direction') === orderDirection
    );

    expect(req.request.method).toBe('GET');
    req.flush(dummyProducts);
  });

  it('should call fetchCategories with correct params', () => {
    const dummyCategories = [{ id: 1, name: 'Category A' }];
    const searchTerm = 'test';

    service.fetchCategories(searchTerm).subscribe(categories => {
      expect(categories).toEqual(dummyCategories);
    });

    const req = httpMock.expectOne(request =>
      request.url === `${baseUrl}/categories` &&
      request.params.get('search') === searchTerm
    );

    expect(req.request.method).toBe('GET');
    req.flush(dummyCategories);
  });

  it('should call fetchCategories without searchTerm', () => {
    const dummyCategories = [{ id: 1, name: 'Category A' }];

    service.fetchCategories().subscribe(categories => {
      expect(categories).toEqual(dummyCategories);
    });

    const req = httpMock.expectOne(`${baseUrl}/categories`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyCategories);
  });
});
