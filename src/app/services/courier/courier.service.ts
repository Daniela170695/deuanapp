import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';

import { Observable } from 'rxjs';

import { Order } from '../../interfaces/order';

@Injectable({
  providedIn: 'root'
})
export class CourierService {
  
  private orderCollection: AngularFirestoreCollection<Order>;
  private orders: Observable<Order[]>;

  constructor() { }
}
