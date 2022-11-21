import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { take } from 'rxjs/operators';
import { City } from '../../interfaces/city';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  private cityCollection: AngularFirestoreCollection<City>;
  private cities: Promise<City[]>;
  private cityDoc: AngularFirestoreDocument<City>;
  private city: Promise<City>;

  constructor(private afs: AngularFirestore) { }

  getAll(){
    this.cityCollection = this.afs.collection<City>('City');
    this.cities = this.cityCollection.valueChanges({idField: 'id'}).pipe(take(1)).toPromise();
    return this.cities;
  }

  getOne(id:string){
    this.cityDoc = this.afs.doc<City>('City/'+id);
    this.city = this.cityDoc.valueChanges({idField: 'id'}).pipe(take(1)).toPromise();
    return this.city;
  }

}
