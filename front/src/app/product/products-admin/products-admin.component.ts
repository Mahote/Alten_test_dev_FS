import { Component, OnInit } from '@angular/core';
import { Product } from 'app/services/product.model';
import { ProductsService } from 'app/services/products.service';

@Component({
  selector: 'app-products-admin',
  templateUrl: './products-admin.component.html',
  styleUrls: ['./products-admin.component.scss']
})
export class ProductsAdminComponent implements OnInit {

  productDialog: boolean;

    products: Product[];


    selectedProducts: Product[];

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.productsService.getProducts().subscribe((products: Product[]) => {
      this.products = products;
    })
  }

}
