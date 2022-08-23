import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AlertController} from '@ionic/angular';
import { Router } from '@angular/router';

import { take } from 'rxjs/operators';

import { EstablishmentType } from '../interfaces/establishment-type';
import { User } from '../interfaces/user';
import { Establishment } from '../interfaces/establishment';
import { City } from '../interfaces/city';

import { CityService } from '../services/city/city.service';
import { EstablishmentTypeService } from '../services/establishment-type/establishment-type.service';
import { AuthService } from '../services/auth/auth.service';
import { EstablishmentService } from '../services/establishment/establishment.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.page.html',
  styleUrls: ['./register-user.page.scss'],
})
export class RegisterUserPage implements OnInit {

  establishmentForm: FormGroup;
  cities: City[];
  typeEstablishments: EstablishmentType[];

  constructor(
    private formBuilder: FormBuilder,
    private cityService:CityService,
    private establishmentTypeService: EstablishmentTypeService,
    private authService: AuthService,
    private establishmentService: EstablishmentService,
    private alertController:AlertController,
    private router: Router) {
    this.cityService.getAllCities().then(data=>{
      this.cities = data;
    });
    this.establishmentTypeService.getEstablishmentTypes().then(data=>{
      this.typeEstablishments = data;
    });
  }

  ngOnInit(){
    this.establishmentForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      type: ['', [Validators.required]],
      city: ['', [Validators.required]],
      address: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9\-_ ]+$')]],
      cellphone: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get name() {
    return this.establishmentForm.get('name');
  }

  get type() {
    return this.establishmentForm.get('type');
  }

  get city() {
    return this.establishmentForm.get('city');
  }

  get address(){
    return this.establishmentForm.get('address');
  }

  get cellphone(){
    return this.establishmentForm.get('cellphone');
  }

  get email() {
    return this.establishmentForm.get('email');
  }

  get password() {
    return this.establishmentForm.get('password');
  }

  registerEstablishment(){
    if(this.establishmentForm.valid){
      this.establishmentService.getEstablishmentByName(this.establishmentForm.value.name).then(async data=>{
        if(data.length>0){
          const alert = await this.alertController.create({
            header: ':(',
            message: 'Nombre registrado',
            buttons: ['OK'],
          });
          await alert.present();
        }
        else{
          const user: User = {
            email: this.establishmentForm.value.email,
            password: this.establishmentForm.value.password
          };

          try {
            const userCredential = await this.authService.signUp(user);
            const establishment: Establishment = {
              uid: userCredential.user.uid,
              name: this.establishmentForm.value.name,
              type: this.establishmentForm.value.type,
              city: this.establishmentForm.value.city,
              address: this.establishmentForm.value.address,
              cellphone: this.establishmentForm.value.cellphone
            };
            this.establishmentService.add(establishment);
          } catch (error) {
            const alert = await this.alertController.create({
              header: ':(',
              message: 'Email registrado',
              buttons: ['OK'],
            });
            await alert.present();
          }
        }
      });
    }
  }

  openLogin(){
    this.router.navigate(['/login']);
  }
}
