import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';

import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { Product } from '../../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productCollection: AngularFirestoreCollection<Product>;
  private products: Observable<Product[]>;
  private productDoc: AngularFirestoreDocument<Product>;
  private product: Observable<Product>;

  constructor(private afs: AngularFirestore) { }

  getOneByCategory(category:string){
    this.productCollection = this.afs.collection<Product>('Product', ref=>ref.where('category_product', '==', category));
    this.products = this.productCollection.valueChanges({idField:'id'});
    return this.products.pipe(take(1)).toPromise();
  }

  getOneById(id:string){
    this.productDoc = this.afs.doc<Product>('Product/'+id);
    this.product = this.productDoc.valueChanges();
    return this.product.pipe(take(1)).toPromise();
  }
}
