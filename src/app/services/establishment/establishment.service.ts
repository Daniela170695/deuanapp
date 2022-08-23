import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';

import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { Establishment } from '../../interfaces/establishment';

@Injectable({
  providedIn: 'root'
})
export class EstablishmentService {

  private establismentCollection: AngularFirestoreCollection<Establishment>;
  private establisments: Observable<Establishment[]>;
  private establismentDoc: AngularFirestoreDocument<Establishment>;
  private establisment: Observable<Establishment>;

  constructor(private afs: AngularFirestore) { }

  add(establisment:Establishment){
    this.establismentCollection = this.afs.collection<Establishment>('Establishment');
    this.establismentCollection.add(establisment);
  }

  getEstablishmentByName(name:string){
    this.establismentCollection = this.afs.collection<Establishment>('Establishment', ref=>ref.where("name", "==", name));
    this.establisments = this.establismentCollection.valueChanges();
    return this.establisments.pipe(take(1)).toPromise();
  }

  getEstablishmentByUid(uid:string){
    this.establismentCollection = this.afs.collection<Establishment>('Establishment', ref=>ref.where("uid", "==", uid));
    this.establisments = this.establismentCollection.valueChanges({idField:'id'});
    return this.establisments.pipe(take(1)).toPromise();
  }

  getEstablishmentById(id:string){
    this.establismentDoc = this.afs.doc<Establishment>('Establishment/'+id);
    this.establisment = this.establismentDoc.valueChanges();
    return this.establisment.pipe(take(1)).toPromise();
  }
}
