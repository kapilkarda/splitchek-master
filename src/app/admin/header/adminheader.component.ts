import {Component} from '@angular/core';
import {Router,ActivatedRoute,Params,Data} from '@angular/router';
import {NgForm} from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
   selector: 'adminheader',
   templateUrl: './adminheader.html',
})

export class adminheaderComponent {
    model: any = {};
	
	constructor(
   	private router: Router
   ){ }

   logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('email');
      this.router.navigate(['/']);
	}
}