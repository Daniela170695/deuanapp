import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-validate',
  templateUrl: './validate.page.html',
  styleUrls: ['./validate.page.scss'],
})
export class ValidatePage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  openLogin(){
    this.router.navigate(['login']);
  }

}
