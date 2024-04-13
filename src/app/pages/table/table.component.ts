import { Component } from '@angular/core';
import { Product } from '../../models/product.model';
import { HttpClient } from '@angular/common/http';
import { DataSourceProduct } from './data-source';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  //styleUrls: ['./table.component.css']
})
export class TableComponent { 
  dsProducts: DataSourceProduct = new DataSourceProduct();
  columns: string[] = ['cover', '#No', 'Name', 'price', 'actions'];

  total = 0;

  search = new FormControl('', { nonNullable: true });

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.http.get<Product[]>('https://api.escuelajs.co/api/v1/products')
    .subscribe(data => {
      this.dsProducts.init(data);
      this.total = this.dsProducts.getTotal();
    })

    this.search.valueChanges
    .pipe(
      debounceTime(300)
    )
    .subscribe(value => {
      this.dsProducts.find(value);
    });
  }

  update(product: Product){
    this.dsProducts.update(product.id, {price: 20});
  }
}
