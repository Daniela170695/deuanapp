import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { EstablishmentType } from '../../interfaces/establishment-type';

@Injectable({
  providedIn: 'root'
})
export class EstablishmentTypeService {

  private establishmentTypeCollection: AngularFirestoreCollection<EstablishmentType>;
  private establishments: Observable<EstablishmentType[]>;

  constructor(private afs: AngularFirestore) { }

  getEstablishmentTypes(){
    this.establishmentTypeCollection = this.afs.collection<EstablishmentType>('EstablishmentType');
    this.establishments = this.establishmentTypeCollection.valueChanges();
    return this.establishments.pipe(take(1)).toPromise();
  }
}
