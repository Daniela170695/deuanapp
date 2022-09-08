import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

export interface Type{
 id:number;
 name:string;
}

@Component({
  selector: 'app-type-service',
  templateUrl: './type-service.page.html',
  styleUrls: ['./type-service.page.scss'],
})

export class TypeServicePage implements OnInit {
  types:Type[];
  typeSelected: number;

  constructor(private router: Router) {
    this.types = [
      {id:1, name:"Compras"},
      {id:2, name:"Favores"},
      {id:3, name:"Paqueteria y Mensajeria"}
    ];
  }

  ngOnInit() {
  }

  openService(){
    if(!this.typeSelected){
      return;
    }
    if(this.typeSelected==1){
      this.router.navigate(['tabs/principal/type-service/shopping'])
    }
    else if(this.typeSelected==2){
      this.router.navigate(['tabs/principal/type-service/procedures'])
    }
    else{
      this.router.navigate(['tabs/principal/type-service/courier-messaging'])
    }
  }

}
