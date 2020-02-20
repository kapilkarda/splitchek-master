import {Component} from '@angular/core';
import {Router,ActivatedRoute,Params,Data} from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
   selector: 'adminfooter',
   templateUrl: './adminfooter.html',
})

export class adminfooterComponent {
	currentYear: any;
	
	constructor() {
      let d = new Date();
      this.currentYear = d.getFullYear();    
   }

	ngOnInit() { }
}


