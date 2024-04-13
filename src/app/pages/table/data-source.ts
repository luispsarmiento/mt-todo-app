import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable } from 'rxjs';

import { Product } from '../../models/product.model'

export class DataSourceProduct extends DataSource<Product>{

  data = new BehaviorSubject<Product[]>([]);
  originalData: Product[] = [];

  init(products: Product[]){
    this.originalData = products;
    this.data.next(products);
  }

  override connect(collectionViewer: CollectionViewer): Observable<readonly Product[]> {
    return this.data;
  }

  override disconnect(collectionViewer: CollectionViewer): void {
    
  }

  getTotal() {
    const products = this.data.getValue();

    return products.map(x => x.price)
                   .reduce((price, total) => price + total, 0);
  }

  //The generic partial allows editing all attributes of the product class
  update(id: Product['id'], changes: Partial<Product>){
    const products = this.data.getValue();

    const productIndex = products.findIndex(x => x.id == id);

    if (productIndex != -1){
      products[productIndex] = {
        ...products[productIndex],
        ...changes,
      };

      this.data.next(products);
    }
  }

  find(query: string) {
    const newProducts = this.originalData
    .filter(item => {
      const word = `${item.id}-${item.title}-${item.price}`;
      return word.toLowerCase().includes(query.toLowerCase())
    });
    this.data.next(newProducts);
  }
}