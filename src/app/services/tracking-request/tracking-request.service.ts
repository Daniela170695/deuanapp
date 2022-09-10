import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';

import { Observable } from 'rxjs';

import { TrackingRequest } from '../../interfaces/tracking-request';

@Injectable({
  providedIn: 'root'
})
export class TrackingRequestService {

  private trackingRequestCollection: AngularFirestoreCollection<TrackingRequest>;
  private trackingRequests: Observable<TrackingRequest[]>;
  private trackingRequestDoc: AngularFirestoreDocument<TrackingRequest>;

  constructor(private afs: AngularFirestore) { }

  add(trackingRequest:TrackingRequest){
    this.trackingRequestCollection = this.afs.collection<TrackingRequest>('TrackingRequest');
    this.trackingRequestCollection.add(trackingRequest);
  }

  getByRequest(request:string){
    this.trackingRequestCollection = this.afs.collection<TrackingRequest>('TrackingRequest', ref=>ref.where('request', '==', request));
    this.trackingRequests = this.trackingRequestCollection.valueChanges({idField: 'id'});
    return this.trackingRequests;
  }

  cancelRequest(id:string){
    this.trackingRequestDoc = this.afs.doc<TrackingRequest>('TrackingRequest/'+id);
    this.trackingRequestDoc.update({cancelled:true, cancelled_datetime:new Date()});
  }
}
