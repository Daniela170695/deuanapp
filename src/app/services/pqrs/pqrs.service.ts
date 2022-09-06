import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Pqrs } from '../../interfaces/pqrs';

@Injectable({
  providedIn: 'root'
})
export class PqrsService {

  private pqrsCollection: AngularFirestoreCollection<Pqrs>;

  constructor(private afs: AngularFirestore) { }

  add(pqrs:Pqrs){
    this.pqrsCollection = this.afs.collection<Pqrs>('Pqrs');
    this.pqrsCollection.add(pqrs);
  }
}
