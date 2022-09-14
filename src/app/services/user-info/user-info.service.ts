import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';

import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { UserInfo } from '../../interfaces/user-info';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  private userInfoCollection: AngularFirestoreCollection<UserInfo>;
  private usersInfo: Observable<UserInfo[]>;
  // private UserInfoDoc: AngularFirestoreDocument<UserInfo>;
  // private userInfo: Observable<UserInfo>;

  constructor(private afs: AngularFirestore) { }

  add(userInfo:UserInfo){
    this.userInfoCollection = this.afs.collection<UserInfo>('UserInfo');
    this.userInfoCollection.add(userInfo);
  }

  getUserInfoByUid(uid:string){
    this.userInfoCollection = this.afs.collection<UserInfo>('UserInfo', ref=>ref.where("uid", "==", uid));
    this.usersInfo = this.userInfoCollection.valueChanges({idField:'id'});
    return this.usersInfo.pipe(take(1)).toPromise();
  }

  // getEstablishmentById(id:string){
  //   this.establismentDoc = this.afs.doc<Establishment>('Establishment/'+id);
  //   this.establisment = this.establismentDoc.valueChanges();
  //   return this.establisment.pipe(take(1)).toPromise();
  // }
  //

  update(id:string, name:string, lastname:string, cellphone:number){
    this.userInfoDoc = this.afs.doc<UserInfo>('UserInfo/'+id);
    this.userInfoDoc.update({name, lastname, cellphone});
  }
}
