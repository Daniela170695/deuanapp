import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Pqrs } from '../interfaces/pqrs';
import { PqrsService } from '../services/pqrs/pqrs.service';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {

  pqrsForm: FormGroup;

  constructor(
    private formBuilder:FormBuilder,
    private toastController: ToastController,
    private pqrsService: PqrsService,
    private authService:AuthService) { }

  ngOnInit() {
    this.pqrsForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.pattern('^[a-zA-Z_ ]+$')]],
      description: ['', [Validators.required, Validators.pattern('^[a-zA-Z_ ]+$')]]
    });
  }

  get title(){
    return this.pqrsForm.get('title');
  }

  get description(){
    return this.pqrsForm.get('description');
  }

  async sendPqrs(){
    if(this.pqrsForm.valid){
      try{
        const currentUser = await this.authService.getCurrentUser();
        // const establishment = await this.establishmentService.getEstablishmentByUid(currentUser.uid);
        const pqrs: Pqrs = {
          establishment: "dsd",
          title: this.title.value,
          description: this.description.value,
          created_datetime: new Date()
        };
        this.pqrsService.add(pqrs);
        const toast = await this.toastController.create({
          message: 'Pqrs enviado con exito',
          duration: 1500,
          position: 'top'
        });
        await toast.present();
      }
      catch(error){
        console.log(error);
      }
    }
  }

}
