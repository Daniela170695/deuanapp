import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-config-support',
  templateUrl: './config-support.page.html',
  styleUrls: ['./config-support.page.scss'],
})
export class ConfigSupportPage implements OnInit {

  constructor(private authService:AuthService, private route:Router) { }

  ngOnInit() {
  }

  logout(){
    localStorage.removeItem('establishment');
    this.authService.signOut();
    this.router.navigate(['/login']);
  }

}
