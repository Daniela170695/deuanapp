import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';

import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { EstablishmentType } from '../../interfaces/establishment-type';

@Injectable({
  providedIn: 'root'
})
export class EstablishmentTypeService {

  private establishmentTypeCollection: AngularFirestoreCollection<EstablishmentType>;
  private establishments: Observable<EstablishmentType[]>;
  private establishmentTypeDoc: AngularFirestoreDocument<EstablishmentType>;
  private establishmentType: Observable<EstablishmentType>;

  constructor(private afs: AngularFirestore) { }

  getEstablishmentTypes(){
    this.establishmentTypeCollection = this.afs.collection<EstablishmentType>('EstablishmentType');
    this.establishments = this.establishmentTypeCollection.valueChanges({idField:'id'});
    return this.establishments.pipe(take(1)).toPromise();
  }

  getEstablishmentTypeById(id:string){
    this.establishmentTypeDoc = this.afs.doc<EstablishmentType>('EstablishmentType/'+id);
    this.establishmentType = this.establishmentTypeDoc.valueChanges({idField:'id'});
    return this.establishmentType.pipe(take(1)).toPromise();
  }


}
