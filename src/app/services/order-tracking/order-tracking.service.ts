import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';

import { Observable } from 'rxjs';

import { OrderTracking } from '../../interfaces/order-tracking';

@Injectable({
  providedIn: 'root'
})
export class OrderTrackingService {

  private orderTrackingCollection: AngularFirestoreCollection<OrderTracking>;
  private ordersTracking: Observable<OrderTracking[]>;
  private orderTrackingDoc: AngularFirestoreDocument<OrderTracking>;


  constructor(private afs: AngularFirestore) { }

  add(order:OrderTracking){
    this.orderTrackingCollection = this.afs.collection<OrderTracking>('OrderTracking');
    this.orderTrackingCollection.add(order);
  }

  getByOrder(order:string){
    this.orderTrackingCollection = this.afs.collection<OrderTracking>('OrderTracking', ref=>ref.where('order', '==', order));
    this.ordersTracking = this.orderTrackingCollection.valueChanges({idField: 'id'});
    return this.ordersTracking;
  }

  cancelOrder(id:string){
    this.orderTrackingDoc = this.afs.doc<OrderTracking>('OrderTracking/'+id);
    this.orderTrackingDoc.update({cancelled:true, cancelled_datetime:new Date()});
  }

}
