import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-config-support',
  templateUrl: './config-support.page.html',
  styleUrls: ['./config-support.page.scss'],
})
export class ConfigSupportPage implements OnInit {

  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit() {
  }

  logout(){
    this.authService.signOut();
    this.router.navigate(['login']);
  }

  openInfoEstablishment(){
    this.router.navigate(['tabs/config-support/info-establishment']);
  }

  openInfoAccount(){
    this.router.navigate(['tabs/config-support/info-account']);
  }

  openContact(){
    this.router.navigate(['tabs/config-support/contact']);
  }

}
