import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ValidationErrors } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { User } from '../interfaces/user';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-info-account',
  templateUrl: './info-account.page.html',
  styleUrls: ['./info-account.page.scss'],
})
export class InfoAccountPage implements OnInit {

  accountForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastController: ToastController,
    private alertController: AlertController) {
      this.accountForm = this.formBuilder.group({
        email: [""],
        passwordOld: ["", [Validators.required, Validators.minLength(6)]],
        passwordNew: ["", [Validators.required, Validators.minLength(6)]],
        passwordNewRepeat: ["", [Validators.required, Validators.minLength(6)]],
      }, { validators: this.password });
      this.authService.getCurrentUser().then(currentUser=>{
        this.email.setValue(currentUser.email);
      });
     }

  ngOnInit() {

  }

  get email(){
    return this.accountForm.get('email');
  }

  get passwordOld(){
    return this.accountForm.get('passwordOld');
  }

  get passwordNew(){
    return this.accountForm.get('passwordNew');
  }

  get passwordNewRepeat(){
    return this.accountForm.get('passwordNewRepeat');
  }

  async update(){
    if(this.accountForm.valid){
      try{
        const user:User={
          email: this.email.value,
          password: this.passwordOld.value
        };
        await this.authService.updatePassword(user, this.passwordNew.value);
        const toast = await this.toastController.create({
          message: 'Cuenta actualizada',
          duration: 1500,
          position: 'top'
        });
        await toast.present();
      }
      catch(error){
        const alert = await this.alertController.create({
          header: ':(',
          message: 'Contraseña actual incorrecta',
          buttons: ['OK'],
        });
        await alert.present();
      }
    }
  }

  password(formGroup: FormGroup):ValidationErrors {
   const passwordNew = formGroup.get("passwordNew").value;
   const passwordNewRepeat = formGroup.get("passwordNewRepeat").value;
   return passwordNew === passwordNewRepeat ? null : { passwordNotMatch: true };
  }

}
