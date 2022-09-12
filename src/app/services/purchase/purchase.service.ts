import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';

import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { Purchase } from '../../interfaces/purchase';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {
  private purchaseCollection: AngularFirestoreCollection<Purchase>;

  constructor(private afs: AngularFirestore) { }

  add(purchase:Purchase){
    this.purchaseCollection = this.afs.collection<Purchase>('Purchase');
    this.purchaseCollection.add(purchase);
  }
}
