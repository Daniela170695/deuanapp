import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ValidationErrors } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { User } from '../interfaces/user';
import { AuthService } from '../services/auth/auth.service';
import { UserInfoService } from '../services/user-info/user-info.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {

  profileForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private toastController: ToastController,
    private authService: AuthService,
    private userInfoService: UserInfoService) {
    }

  ngOnInit() {
    this.profileForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z_ ]+$')]],
      lastname: ['', [Validators.required, Validators.pattern('^[a-zA-Z_ ]+$')]],
      cellphone: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    });

    this.getCurrentUser().then(currentUser=>{
      this.getUserInfoByUid(currentUser.uid).then(userInfo=>{
        this.profileForm.patchValue({
          name: userInfo[0].name,
          lastname: userInfo[0].lastname,
          cellphone: userInfo[0].cellphone,
        })
      })
    });

  }

  get email(){
    return this.profileForm.get('email');
  }

  get name(){
    return this.profileForm.get('name');
  }

  get lastname(){
    return this.profileForm.get('lastname');
  }

  get cellphone(){
    return this.profileForm.get('cellphone');
  }


  async update(){
    if(this.profileForm.valid){
      try{
        const currentUser = await this.getCurrentUser();
        const userInfo = await this.getUserInfoByUid(currentUser.uid);
        this.userInfoService.update(userInfo.id, this.name.value, this.lastname.value, this.cellphone.value);
        const toast = await this.toastController.create({
          message: 'Perfil actualizado con exito',
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

  async getCurrentUser(){
    const currentUser = await this.authService.getCurrentUser();
    return currentUser;
  }

  async getUserInfoByUid(uid:string){
    const userInfo = await this.userInfoService.getUserInfoByUid(uid);
    return userInfo;
  }

}
