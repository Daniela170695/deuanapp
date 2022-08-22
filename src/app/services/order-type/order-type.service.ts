import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { OrderType } from '../../interfaces/order';

@Injectable({
  providedIn: 'root'
})
export class OrderTypeService {

  private orderTypeDoc: AngularFirestoreDocument<OrderType>;
  private orderType: Observable<OrderType>;

  constructor(private afs: AngularFirestore) { }

  getOrderType(id:string){
    this.orderTypeDoc = this.afs.doc<OrderType>('OrderType/'+id);
    this.orderType = this.orderTypeDoc.valueChanges();
    return this.orderType.pipe(take(1)).toPromise();
  }
}
