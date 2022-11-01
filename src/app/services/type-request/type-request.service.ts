import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';

import { Observable } from 'rxjs';

import { TypeRequest } from '../../interfaces/type-request';

@Injectable({
  providedIn: 'root'
})
export class TypeRequestService {

  private typeRequestDoc: AngularFirestoreDocument<TypeRequest>;
  private typeRequest: Observable<TypeRequest>;

  constructor(private afs: AngularFirestore) { }

  getTypeRequest(id:string){
    this.typeRequestDoc = this.afs.doc<TypeRequest>('TypeRequest/'+id);
    this.typeRequest = this.typeRequestDoc.valueChanges();
    return this.typeRequest.pipe(take(1)).toPromise();
  }
}
