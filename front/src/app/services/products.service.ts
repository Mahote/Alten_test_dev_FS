import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Product, Products } from './product.model';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private url = "assets/products.json"

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Products>(this.url).pipe(
      map(response => response.products)
    );
  };

}
