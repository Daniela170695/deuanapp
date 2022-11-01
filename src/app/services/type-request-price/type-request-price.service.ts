import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { TypeRequestPrice } from '../../interfaces/type-request-price';

@Injectable({
  providedIn: 'root'
})
export class TypeRequestPriceService {

  private typeRequestPriceCollection: AngularFirestoreCollection<TypeRequestPrice>;
  private typesRequestPrice: Observable<TypeRequestPrice[]>;

  constructor(private afs: AngularFirestore) { }

  getTypeRequestPrice(typeRequest:number){
    this.typeRequestPriceCollection = this.afs.collection<TypeRequestPrice>('TypeRequestPrice', ref=>ref.where("type_request", "==", typeRequest));
    this.typesRequestPrice = this.typeRequestPriceCollection.valueChanges();
    return this.typesRequestPrice.pipe(take(1)).toPromise();
  }
}
