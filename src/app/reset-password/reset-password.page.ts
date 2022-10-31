import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors} from '@angular/forms';
import { AlertController} from '@ionic/angular';
import { ToastController } from '@ionic/angular';

import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {

  resetPasswordForm:FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private toastController: ToastController) { }

  ngOnInit() {
    this.resetPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get email() {
    return this.resetPasswordForm.get('email');
  }

  async resetPassword(email:string){
    try{
      await this.authService.sendPasswordResetEmail(this.email.value);
      const toast = await this.toastController.create({
        message: 'Te hemos enviado un email para validar tu identidad y reestablecer tu contraseña',
        duration: 1500,
        position: 'top'
      });
      await toast.present();
    }
    catch(e){
      const alert = await this.alertController.create({
        header: ':(',
        message: 'Correo invalido, revisa e intentalo de nuevo',
        buttons: ['OK'],
      });
      await alert.present();
      console.log("e");
    }

  }


}
