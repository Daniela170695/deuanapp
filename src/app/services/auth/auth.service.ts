import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
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

  getAuthState(){
    return this.auth.authState;
  }

}
