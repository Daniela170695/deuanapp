import { Component, OnInit, Input } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.page.html',
  styleUrls: ['./header.page.scss'],
})
export class HeaderPage implements OnInit {
  @Input() showBack: boolean;
  @Input() showConfig: boolean;
  @Input() urlBack: string;

  constructor(
    public actionSheetController: ActionSheetController,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit() {
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Usuario',
      buttons: [{
          text: 'Editar Cuenta',
          handler: () => {
            this.router.navigate(['edit-account']);
          }
        },
        {
          text: 'Editar Perfil',
          handler: () => {
            this.router.navigate(['edit-profile']);
          }
        },
        {
          text: 'Cerrar Sesion',
          handler: async () => {
            await this.authService.signOut();
            this.router.navigate(['login']);
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel'
        }]
    });
    await actionSheet.present();
  }

  back(){
    this.router.navigate([this.urlBack]);
  }

}
