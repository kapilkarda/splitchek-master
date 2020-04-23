import {Component} from '@angular/core';
import {Router,ActivatedRoute,Params,Data} from '@angular/router';
import {NgForm} from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { OverlayPanel } from 'primeng/overlaypanel';

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
      localStorage.clear();
      this.router.navigateByUrl('/');
  }

}
