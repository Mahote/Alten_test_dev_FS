import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductsAdminComponent } from './products-admin/products-admin.component';
import { ProductsComponent } from './products/products.component';
import { SharedModule } from 'primeng/api';
import { ReactiveFormsModule } from '@angular/forms';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { DataViewModule } from 'primeng/dataview';




@NgModule({
  declarations: [
    ProductsAdminComponent,
    ProductsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    TagModule,
    RatingModule,
    ReactiveFormsModule,
    DataViewModule
  ],
  exports: [
    ProductsAdminComponent,
    ProductsComponent
  ]
})
export class ProductModule { }
