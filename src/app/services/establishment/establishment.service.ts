import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { Establishment } from '../../interfaces/establishment';

@Injectable({
  providedIn: 'root'
})
export class EstablishmentService {

  private establismentCollection: AngularFirestoreCollection<Establishment>;
  private establisments: Observable<Establishment[]>;

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
}
