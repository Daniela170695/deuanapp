import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Pqrs } from '../interfaces/pqrs';
import { PqrsService } from '../services/pqrs/pqrs.service';
import { AuthService } from '../services/auth/auth.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-config-support',
  templateUrl: './config-support.page.html',
  styleUrls: ['./config-support.page.scss'],
})
export class ConfigSupportPage implements OnInit {
  pqrsForm: FormGroup;

  constructor(
    private formBuilder:FormBuilder,
    private toastController: ToastController,
    private pqrsService: PqrsService,
    private authService:AuthService) {
  }

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

  sendPqrs(){
    if(this.pqrsForm.valid){
      this.authService.getAuthState().pipe(take(1)).subscribe(async(currentUser)=>{
        try {
          const pqrs: Pqrs = {
            uid: currentUser.uid,
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
        } catch (error) {
          console.log(error);
        }

      })
    }
  }

  logout(){
    this.authService.signOut();
    // this.router.navigate(['login']);
  }

}
