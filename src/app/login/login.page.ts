import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController} from '@ionic/angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { User } from '../interfaces/user';

import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;

  constructor(
    private router:Router,
    private formBuilder:FormBuilder,
    private alertController: AlertController,
    private authService: AuthService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  async login(){
    if(this.loginForm.valid){
      const user: User = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      };

      try {
        const userCredential = await this.authService.signIn(user);
        const emailVerified = userCredential.user.emailVerified;
        if(emailVerified == true){
          this.router.navigate(['tabs/home'])
        }
        else{
          const alert = await this.alertController.create({
            header: ':(',
            message: 'Correo no verificado, revisa tu correo',
            buttons: ['OK'],
          });
          await alert.present();
        }
      } catch (error) {
        const alert = await this.alertController.create({
          header: ':(',
          message: 'Correo o contraseña invalida, revisa e intentalo de nuevo',
          buttons: ['OK'],
        });
        await alert.present();
      }
    }
  }

}
