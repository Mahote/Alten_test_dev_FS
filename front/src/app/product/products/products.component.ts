import { Component, OnInit } from '@angular/core';
import { Product } from 'app/services/product.model';
import { ProductsService } from 'app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  constructor(private productsService: ProductsService) { }

  layout: string = 'list'
  products!: Product[]

  ngOnInit(): void {


    this.productsService.getProducts().subscribe((products: Product[]) => {
      this.products = products;
      console.log(this.products)
    })
  }
  getSeverity(product: Product) {
    switch (product.inventoryStatus) {
        case 'INSTOCK':
            return 'success';

        case 'LOWSTOCK':
            return 'warning';

        case 'OUTOFSTOCK':
            return 'danger';

        default:
            return null;
    }
  };
}
