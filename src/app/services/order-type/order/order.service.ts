import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Order } from '../../interfaces/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private afs: AngularFirestore) { }

  private orderCollection: AngularFirestoreCollection<Order>;
  private orders: Observable<Order[]>;
  private orderDoc: AngularFirestoreDocument<Order>;
  private order: Observable<Order>;

  add(order: Order){
    this.orderCollection = this.afs.collection<Order>('Order');
    this.orderCollection.add(order);
  }

  getAllOrders(establishment:string){
    this.orderCollection = this.afs.collection<Order>('Order', ref=>ref.where('establishment', '==', establishment));
    this.orders = this.orderCollection.valueChanges({idField: 'id'})
    return this.orders;
  }

  cancelOrder(order:string){
    this.orderDoc = this.afs.doc<Order>('Order/'+order);
    this.orderDoc.update({cancelled:true});
  }

  getOneOrder(order:string){
    this.orderDoc = this.afs.doc<Order>('Order/'+order);
    this.order = this.orderDoc.valueChanges();
    return this.order;
  }
}
