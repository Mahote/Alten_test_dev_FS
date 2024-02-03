import { Component, OnInit } from '@angular/core';
import { Product } from 'app/services/product.model';
import { ProductsService } from 'app/services/products.service';
import { ConfirmationService, SelectItem } from 'primeng/api';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  constructor(private productsService: ProductsService, confirmationService: ConfirmationService) { }

  sortOptions!: SelectItem[]

  sortOrder: number = 1

  sortField!: string
  
  layout: string = 'list'
  
  products!: Product[]

  filteredProducts: Product[] = [];

  searchTerm: string = '';

  ngOnInit(): void {
    this.productsService.products$.subscribe(products => {
      this.products = products;
      this.filteredProducts = products;
    });

    this.sortOptions = [
      { label: 'Sort by name', value:'name'},
      { label: 'Sort by price', value:'price'},
    ]
  }

  onSortChange(event: any): void {
    this.sortField = event.value;
    this.sortProducts();
  }

  sortProducts(): void {
    this.products.sort((a: Product, b: Product) => {
      const fieldA = a[this.sortField];
      const fieldB = b[this.sortField];

      if (fieldA < fieldB) {
        return -1 * this.sortOrder;
      } else if (fieldA > fieldB) {
        return 1 * this.sortOrder;
      } else {
        return 0;
      }
    });
    console.log(this.products)
  }

  filterProducts(): void {
    if (!this.searchTerm) {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter(product =>
        product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
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
