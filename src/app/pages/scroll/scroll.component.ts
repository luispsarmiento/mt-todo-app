import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Product {
  id: string;
  title: string;
  price: number;
  images: string[];
}

@Component({
  selector: 'app-scroll',
  templateUrl: './scroll.component.html',
  styleUrls: []
})
export class ScrollComponent implements OnInit {

  products: Product[] = [];

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    for(let i=0; i < 20; i++){
      this.http.get<Product[]>('https://api.escuelajs.co/api/v1/products')
      .subscribe(data => {
        this.products = [...this.products, ...data];
        console.log(this.products.length);
      });
    }
  }

}
