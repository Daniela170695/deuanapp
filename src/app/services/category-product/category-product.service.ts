import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { CategoryProduct } from '../../interfaces/category-product';

@Injectable({
  providedIn: 'root'
})
export class CategoryProductService {

  private categoryProductCollection: AngularFirestoreCollection<CategoryProduct>;
  private categoriesProducts: Observable<CategoryProduct[]>;

  constructor(private afs: AngularFirestore) { }

  getAll(){
    this.categoryProductCollection = this.afs.collection<CategoryProduct>('CategoryProduct');
    this.categoriesProducts = this.categoryProductCollection.valueChanges({idField:'id'});
    return this.categoriesProducts.pipe(take(1)).toPromise();
  }
}
