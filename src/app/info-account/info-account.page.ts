import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ValidationErrors } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { User } from '../interfaces/user';
import { AuthService } from '../services/auth/auth.service';
import { UserInfoService } from '../services/user-info/user-info.service';

@Component({
  selector: 'app-info-account',
  templateUrl: './info-account.page.html',
  styleUrls: ['./info-account.page.scss'],
})
export class InfoAccountPage implements OnInit {

  accountForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private toastController: ToastController,
    private alertController: AlertController,
    private authService: AuthService,
    private userInfoService: UserInfoService) {
      this.accountForm = this.formBuilder.group({
        email: [""],
        name: ['', [Validators.required, Validators.pattern('^[a-zA-Z_ ]+$')]],
        lastname: ['', [Validators.required, Validators.pattern('^[a-zA-Z_ ]+$')]],
        cellphone: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
        passwordOld: ["", [Validators.minLength(6)]],
        passwordNew: ["", [Validators.minLength(6)]],
        passwordNewRepeat: ["", [Validators.required, Validators.minLength(6)]],
      }, { validators: this.password });
      this.authService.getCurrentUser().then(currentUser=>{
        this.userInfoService.getUserInfoByUid(currentUser.uid).then(userInfo=>{
          this.accountForm.patchValue({
            email: currentUser.email,
            name: userInfo[0].name,
            lastname: userInfo[0].lastname,
            cellphone: userInfo[0].cellphone,
          })
        })
      });
     }

  ngOnInit() {

  }

  get email(){
    return this.accountForm.get('email');
  }

  get name(){
    return this.accountForm.get('name');
  }

  get lastname(){
    return this.accountForm.get('lastname');
  }

  get cellphone(){
    return this.accountForm.get('cellphone');
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
          message: 'Cuenta actualizada con exito',
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
