import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ValidationErrors } from '@angular/forms';
import { AlertController} from '@ionic/angular';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

import { take } from 'rxjs/operators';

import { User } from '../interfaces/user';
import { UserInfo } from '../interfaces/user-info';
import { City } from '../interfaces/city';

import { AuthService } from '../services/auth/auth.service';
import { UserInfoService } from '../services/user-info/user-info.service';
import { CityService } from '../services/city/city.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.page.html',
  styleUrls: ['./register-user.page.scss'],
})
export class RegisterUserPage implements OnInit {

  userInfoForm: FormGroup;
  cities: City[];

  constructor(
    private formBuilder: FormBuilder,
    private cityService:CityService,
    private authService: AuthService,
    private userInfoService: UserInfoService,
    private alertController:AlertController,
    private router: Router,
    private toastController: ToastController) {
    this.cityService.getAllCities().then(data=>{
      this.cities = data;
    });
  }

  ngOnInit(){
    this.userInfoForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z_ ]+$')]],
      lastname: ['', [Validators.required, Validators.pattern('^[a-zA-Z_ ]+$')]],
      cellphone: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    }, { validators: this.passwordNotMatch });
  }

  get name() {
    return this.userInfoForm.get('name');
  }

  get lastname() {
    return this.userInfoForm.get('lastname');
  }

  get cellphone() {
    return this.userInfoForm.get('cellphone');
  }

  get email(){
    return this.userInfoForm.get('email');
  }

  get password(){
    return this.userInfoForm.get('password');
  }

  get confirmPassword() {
    return this.userInfoForm.get('confirmPassword');
  }

  async registerUser(){
    if(this.userInfoForm.valid){
      try {
        const user: User = {
          email: this.email.value,
          password: this.password.value
        };
        const userCredential = await this.authService.signUp(user);
        const userInfo: UserInfo = {
          uid: userCredential.user.uid,
          name: this.name.value,
          lastname: this.lastname.value,
          cellphone: this.cellphone.value
        };
        this.userInfoService.add(userInfo);
        await this.authService.sendEmailVerification();
        const toast = await this.toastController.create({
          message: 'Confirma tu correo electronico en el link que te enviamos para iniciar sesion',
          duration: 4000,
          position: 'top'
        });
        await toast.present();
        this.router.navigate(["/login"]);
      } catch (error) {
          const alert = await this.alertController.create({
            header: ':(',
            message: 'Email registrado',
            buttons: ['OK'],
          });
          await alert.present();
      }
    }
  }

  passwordNotMatch(formGroup: FormGroup):ValidationErrors {
   const password = formGroup.get("password").value;
   const confirmPassword = formGroup.get("confirmPassword").value;
   return password === confirmPassword ? null : { passwordNotMatch: true };
  }
}
