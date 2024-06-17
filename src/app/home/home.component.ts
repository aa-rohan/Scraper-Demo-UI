import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { ProductListComponent } from '../product-list/product-list.component';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Product } from '../shared/interfaces/interfaces';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AsyncPipe, ProductListComponent, FormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private api: ApiService = inject(ApiService)
  private router: Router = inject(Router)

  products$: Observable<Product[]> = new Observable();
  productUrl: string | null = null;
  showMessage: boolean = false;
  notificationMessage: string = '';

  scrape(): void {
    if (!this.productUrl) {
      return
    }
    this.displayMessage('Scraping Product...');
    this.api.scrapeProduct(this.productUrl).subscribe({
      next: (response: {data: Product}) => {
        this.router.navigate(['/product', response.data.id]);
      },
      error: (err: {error: any}) => {
        this.displayMessage(`There was an issue scraping the product: ${err.error.error_message}`);
      }
    })
  }

  private displayMessage(message: string): void {
    this.notificationMessage = message;
    this.showMessage = true;
    setTimeout(() => {
      this.notificationMessage = '';
      this.showMessage = false;
    }, 1000)
  }
}
