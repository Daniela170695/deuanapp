import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocuemnt } from '@angular/fire/compat/firestore';

import { Observable } from 'rxjs';

import { Order } from '../../interfaces/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private orderCollection: AngularFirestoreCollection<Order>;
  private orders: Observable<Order[]>;
  private orderDoc: AngularFirestoreDocuemnt<Order>;
  private order: Observable<Order>;

  constructor(private afs: AngularFirestore) {}

  add(order:Order){
    this.orderCollection = this.afs.collection<Order>('Order');
    this.orderCollection.add(order);
  }

  getAllOrders(){
    this.orderCollection = this.afs.collection<Order>('Order');
    this.orders = this.orderCollection.valueChanges({idField: 'id'});
    return this.orders;
  }

  getOneOrder(){
    this.orderDoc = this.afs.collection<Order>('Order/'+íd);
    this.order = this.orderDoc.valueChanges();
    return this.order;
  }

}
