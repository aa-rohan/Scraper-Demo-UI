import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';
import { AsyncPipe } from '@angular/common';
import { ProductListComponent } from '../product-list/product-list.component';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AsyncPipe, ProductListComponent, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private api: ApiService = inject(ApiService)
  private router: Router = inject(Router)

  products$: Observable<any[]> = new Observable();
  productUrl: string | null = null;

  scrape() {
    if (!this.productUrl) {
      return
    }
    this.api.scrapeProduct(this.productUrl).subscribe((product: any) => {
      this.router.navigate(['/product', product.data.id]);
    });
  }
}
