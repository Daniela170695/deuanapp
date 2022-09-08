import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';

import { Observable } from 'rxjs';

import { Order } from '../../interfaces/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private orderCollection: AngularFirestoreCollection<Order>;
  private orders: Observable<Order[]>;
  private orderDoc: AngularFirestoreDocument<Order>;
  private order: Observable<Order>;

  constructor(private afs: AngularFirestore) {}

  add(order:Order){
    this.orderCollection = this.afs.collection<Order>('Order');
    return this.orderCollection.add(order);
  }

  getOrdersUrban(establishment:string){
    this.orderCollection = this.afs.collection<Order>('Order', ref=>ref.where('type', '==', 'jgZuLrPdP4SaRjWopSCh').where('establishment', '==', establishment).orderBy('created_datetime', 'desc'));
    this.orders = this.orderCollection.valueChanges({idField: 'id'});
    return this.orders;
  }

  getOrdersParcel(establishment:string){
    this.orderCollection = this.afs.collection<Order>('Order', ref=>ref.where('type', '==', 'WYcv2HHpv8BIGoYjP6r0').where('establishment', '==', establishment).orderBy('created_datetime', 'desc'));
    this.orders = this.orderCollection.valueChanges({idField: 'id'});
    return this.orders;
  }

  getOneOrder(id:string){
    this.orderDoc = this.afs.doc<Order>('Order/'+id);
    this.order = this.orderDoc.valueChanges();
    return this.order;
  }

}
