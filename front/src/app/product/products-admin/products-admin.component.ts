import { Component, OnInit } from '@angular/core';
import { Product } from 'app/services/product.model';
import { ProductsService } from 'app/services/products.service';
import { promises } from 'fs';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-products-admin',
  templateUrl: './products-admin.component.html',
  styleUrls: ['./products-admin.component.scss']
})
export class ProductsAdminComponent implements OnInit {



  productDialog: boolean;

    products: Product[];

    product: Product;

    selectedProducts: Product[];

    submitted: boolean;

    statuses: any[];

    categories: any [];

    filteredProducts: Product[] = [];

    searchTerm: string = '';

    constructor(private productsService: ProductsService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

    ngOnInit() {
      this.productsService.products$.subscribe(products => {
        this.products = products.sort();
        this.filteredProducts = products.sort();
      });

        this.statuses = [
            {label: 'INSTOCK', value: 'instock'},
            {label: 'LOWSTOCK', value: 'lowstock'},
            {label: 'OUTOFSTOCK', value: 'outofstock'}
        ];
        
        this.categories = [
          {label: 'CLOTHING', value: 'clothing'},
          {label: 'FITNESS', value: 'fitness'},
          {label: 'ELECTRONIC', value: 'electronic'}
      ];
    
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

    openNew() {
        this.product = {} as Product;
        this.submitted = false;
        this.productDialog = true;
    }

    deleteSelectedProducts() {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete the selected products ?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {

              let selectedProductIds = this.selectedProducts.map(product => product.id);

              this.productsService.deleteSelectedProducts(selectedProductIds).subscribe(() => {
                this.selectedProducts.forEach(product => {
                  this.products = this.products.filter(p => p.id !== product.id);
                });
                this.selectedProducts = [];
                this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
              });
            }
        });
    }

    editProduct(product: Product) {
        this.product = {...product};
        this.productDialog = true;
    }

    deleteProduct(product: Product) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete ' + product.name + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
              this.productsService.deleteProduct(product.id).subscribe(() => {
                this.products = this.products.filter(p => p.id !== product.id);
                this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
              });
            }
        });
    }

    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
    }

    saveProduct() {
        this.submitted = true;

        if (this.product.name.trim()) {
            if (this.product.id) {
              let index = this.products.findIndex(p => p.id === this.product.id);
              if (index !== -1) {
                this.productsService.updateProduct(this.product).subscribe(() => {
                  this.products[index] = this.product;
                  this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
                });
              }
            }
            else {
              console.log("i am here")
              this.productsService.createProduct(this.product).subscribe((productId: string) => {
                this.product.id = productId;

                this.product.image = this.generateProductImageSource(this.product.name);
                this.products.push({...this.product});
                this.products.sort()
                this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000});
              });
            }

            this.products = [...this.products];
            this.productDialog = false;
            this.product = {} as Product;
        }
    }

    generateProductImageSource(name: string): string {
      // Remplacer les espaces par des tirets et mettre tout en minuscules
      return name.toLowerCase().replace(/\s+/g, '-');
  }
}
