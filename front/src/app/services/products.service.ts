import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, forkJoin, map } from 'rxjs';
import { Product, Products } from './product.model';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private url = "http://localhost:3000/api/products"

  private productsSubject: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  public products$: Observable<Product[]> = this.productsSubject.asObservable();

  products: Product[]
  constructor(private http: HttpClient) {
    this.loadProducts();
   }

  loadProducts() {
    this.http.get<Product[]>(this.url).subscribe(products => {
      console.log(products)
      products.sort((a, b) => a.name.localeCompare(b.name));
      this.productsSubject.next(products);
    });
  }

  createProduct(product: Product): Observable<string> {
    return this.http.post<{ message: string, id: string }>(this.url, product).pipe(
        map(response => {
          const newProductId = response.id;
          this.loadProducts()
          return newProductId;
        })
      );

  }

  updateProduct(product: Product): Observable<void> {
    const updateUrl = `${this.url}/${product.id}`;
    return this.http.put<void>(updateUrl, product).pipe(
      map(() => {
        this.loadProducts(); 
      })
    );
  }

  deleteProduct(productId: string): Observable<void> {
    const deleteUrl = `${this.url}/${productId}`;
    return this.http.delete<void>(deleteUrl).pipe(
      map(() => {
        this.loadProducts(); 
      })
    );
  }

  deleteSelectedProducts(selectedProductIds: string[]): Observable<void> {
    const deleteRequests: Observable<void>[] = [];
    selectedProductIds.forEach(productId => {
      const deleteUrl = `${this.url}/${productId}`;
      deleteRequests.push(this.http.delete<void>(deleteUrl));
    });
    return forkJoin(deleteRequests).pipe(
      map(() => {
        this.loadProducts(); // Recharger les produits après la suppression réussie
      })
    );
}

}
