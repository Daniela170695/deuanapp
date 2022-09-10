import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';

import { Observable } from 'rxjs';

import { Request } from '../../interfaces/request';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private requestCollection: AngularFirestoreCollection<Request>;
  private requestDoc: AngularFirestoreDocument<Request>;
  private request: Observable<Request>;

  constructor(private afs: AngularFirestore) { }

  add(request:Request){
    this.requestCollection = this.afs.collection<Request>('Request');
    return this.requestCollection.add(request);
  }

  getOne(id:string){
    this.requestDoc = this.afs.doc<Request>('Request/'+id);
    this.request = this.requestDoc.valueChanges();
    return this.request;
  }

}
