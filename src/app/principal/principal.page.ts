import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  openRhinoceros(){
    this.router.navigate(['principal/rhinoceros'])
  }

  openTypeService(){
    this.router.navigate(['principal/type-service'])
  }

  openConfigSupport(){
    this.router.navigate(['principal/config-support'])
  }

}
