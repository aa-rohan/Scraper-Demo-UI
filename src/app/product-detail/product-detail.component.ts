import { AsyncPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [AsyncPipe, RouterModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent {
  private route = inject(ActivatedRoute);
  private api = inject(ApiService)
  product$: Observable<any> = new Observable();


  ngOnInit() {
    const id: string | null = this.route.snapshot.paramMap.get('id');
    this.product$ = this.api.fetchProduct(id);
  }
}
