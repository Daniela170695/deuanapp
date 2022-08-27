import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Courier } from '../../interfaces/courier';

@Injectable({
  providedIn: 'root'
})
export class CourierService {

  private courierDoc: AngularFirestoreDocument<Courier>;
  private courier: Observable<Courier>;

  constructor(private afs: AngularFirestore) { }

  getCourier(id:string){
    this.courierDoc = this.afs.doc<Courier>('Courier/'+id);
    this.courier = this.courierDoc.valueChanges();
    return this.courier;
  }
}
