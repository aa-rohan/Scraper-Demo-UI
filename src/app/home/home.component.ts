import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { ProductListComponent } from '../product-list/product-list.component';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

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

  products$: Observable<any[]> = new Observable();
  productUrl: string | null = null;
  showMessage: boolean = false;
  notificationMessage: string = '';

  scrape() {
    if (!this.productUrl) {
      return
    }
    this.displayMessage('Scraping Product...');
    this.api.scrapeProduct(this.productUrl).subscribe((product: any) => {
      this.router.navigate(['/product', product.data.id]);
    }, (error: any) => {
      this.displayMessage('There was an issue scraping the product.');
    });
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
