import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { take } from 'rxjs/operators';
import { User } from '../../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public auth:AngularFireAuth) { }

  signIn(user:User){
    return this.auth.signInWithEmailAndPassword(user.email, user.password);
  }

  signUp(user:User){
    return this.auth.createUserWithEmailAndPassword(user.email, user.password);
  }

  async sendEmailVerification() {
    const currentUser = await this.auth.currentUser;
    currentUser.sendEmailVerification();
  }

  signOut() {
    this.auth.signOut();
  }

  getCurrentUser(){
    return this.auth.authState.pipe(take(1)).toPromise();
  }

  async updatePassword(user:User, password:string){
    const credential = firebase.auth.EmailAuthProvider.credential(user.email, user.password);
    const currentUser = await this.auth.currentUser;
    currentUser.reauthenticateWithCredential(credential);
    return currentUser.updatePassword(password);
  }

}
