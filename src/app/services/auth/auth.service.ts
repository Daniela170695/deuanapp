import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
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
    const currentUser = await this.getCurrentUser();
    currentUser.sendEmailVerification();
  }

  signOut() {
    return this.auth.signOut();
  }

  getAuthState(){
    return this.auth.authState;
  }

  async updatePassword(user:User, password:string){
    const credential = firebase.auth.EmailAuthProvider.credential(user.email, user.password);
    const currentUser = await this.getCurrentUser();
    await currentUser.reauthenticateWithCredential(credential);
    await currentUser.updatePassword(password);
  }

  getCurrentUser(){
    return this.auth.currentUser;
  }

  sendPasswordResetEmail(email:string){
    return this.auth.sendPasswordResetEmail(email);
  }

}
