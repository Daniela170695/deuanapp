import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Establishment } from '../../interfaces/establishment';

@Injectable({
  providedIn: 'root'
})
export class EstablishmentService {

  private establishmentCollection: AngularFirestoreCollection<Establishment>;
  establishments: Observable<Establishment[]>;

  constructor(private afs: AngularFirestore) { }

  add(establishment: Establishment){
    this.establishmentCollection = this.afs.collection<Establishment>('Establishment');
    this.establishmentCollection.add(establishment);
  }

  getEstablishmentByName(name: string){
    this.establishmentCollection = this.afs.collection<Establishment>('Establishment', ref=>ref.where("name", "==", name));
    this.establishments = this.establishmentCollection.valueChanges();
    return this.establishments.pipe(take(1)).toPromise();
  }

  getEstablishmentByUid(uid: string){
    this.establishmentCollection = this.afs.collection<Establishment>('Establishment', ref=>ref.where("uid", "==", uid));
    this.establishments = this.establishmentCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Establishment;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
    return this.establishments.pipe(take(1)).toPromise();
  }
}
