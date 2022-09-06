import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ToastController } from '@ionic/angular';

import { City } from '../interfaces/city';
import { EstablishmentType } from '../interfaces/establishment-type';

import { AuthService } from '../services/auth/auth.service';
import { EstablishmentService } from '../services/establishment/establishment.service';
import { CityService } from '../services/city/city.service';
import { EstablishmentTypeService } from '../services/establishment-type/establishment-type.service';

@Component({
  selector: 'app-info-establishment',
  templateUrl: './info-establishment.page.html',
  styleUrls: ['./info-establishment.page.scss'],
})
export class InfoEstablishmentPage implements OnInit {

  establishmentForm: FormGroup;
  cities: City[];
  typeEstablishment: EstablishmentType;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private establishmentService: EstablishmentService,
    private cityService: CityService,
    private establishmentTypeService: EstablishmentTypeService,
    private toastController: ToastController) {
      this.typeEstablishment = {id:"", name:""};
      this.cityService.getAllCities().then(data=>{
        this.cities = data;
      });
  }

  async ngOnInit() {
    this.establishmentForm = this.formBuilder.group({
      name: [""],
      type: [""],
      city: ["", [Validators.required]],
      address: ["", [Validators.required, Validators.pattern('^[a-zA-Z0-9#\-_ ]+$')]],
      cellphone: ["", [Validators.required, Validators.pattern('^[0-9]+$')]],
    });
    const establishment = await this.getEstablishment();
    this.typeEstablishment = await this.establishmentTypeService.getEstablishmentTypeById(establishment[0].type);
    this.establishmentForm.patchValue({
      name: establishment[0].name,
      type: establishment[0].type,
      city: establishment[0].city,
      address: establishment[0].address,
      cellphone: establishment[0].cellphone
    });
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

  async update(){
    if(this.establishmentForm.valid){
      try {
        const city = this.city.value;
        const address = this.address.value;
        const cellphone = this.cellphone.value;
        const establishment = await this.getEstablishment();
        this.establishmentService.updateEstablishment(establishment[0].id, city, address, cellphone);
        const toast = await this.toastController.create({
          message: 'Establecimiento actualizado',
          duration: 1500,
          position: 'top'
        });
        await toast.present();
      } catch (error) {
        console.log(error);
      }
    }
  }

  async getEstablishment(){
    const user = await this.authService.getCurrentUser();
    const establisment = await this.establishmentService.getEstablishmentByUid(user.uid);
    return establisment;
  }

}
