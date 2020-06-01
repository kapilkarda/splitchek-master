import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params, Data } from '@angular/router';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import {MessageService} from 'primeng/api';
import { AdminService } from '../../services/admin.service';

@Component({
   selector: 'adminlogin',
   templateUrl: './adminlogin.html',
   styleUrls: ['adminlogin.css'],
})

export class adminloginComponent {
   model: any = {};
   result: any;
	
	constructor(
      private router: Router,
      private activatedRoute: ActivatedRoute,
      private adminService: AdminService,
      private spinner: NgxSpinnerService,
      private messageService: MessageService,
   ) { }

	ngOnInit() {
   	if(localStorage.getItem('token') != null && localStorage.getItem('token') !='null'){
         this.router.navigate(['/admin/dashboard']);
       }
      //  console.log(localStorage.getItem('userLogin'))
	}

   login() { 
   	this.spinner.show();
      this.adminService.admin_login(this.model).subscribe(result => {
         this.result = result;
      },
      (err) => console.log(err),
      () => {
      	if (this.result.status === 'success') { 
            localStorage.setItem('userInfo',JSON.stringify(this.result.userData))
            localStorage.setItem('profileImg',this.result.userData.image)
            localStorage.setItem('userLogin',JSON.stringify(this.result.userData.loginType))            
         	localStorage.setItem('token', this.result.token);
            localStorage.setItem('email', this.result.email);
            if(localStorage.getItem('userLogin') == '5'){
            this.router.navigate(['/admin/dashboard']);
            this.spinner.hide();
            this.messageService.add({severity:'success', summary: 'Success', detail:this.result.message});
            }else{
               this.router.navigate(['']);
               this.spinner.hide();
               this.messageService.add({severity:'error', summary: 'Error', detail:'User is not valid'});
            }
            
            // this.messageService.add({severity:'success', summary: 'Success', detail:this.result.message});
         } else { 
            this.spinner.hide();
            this.messageService.add({severity:'error', summary: 'Error', detail:this.result.message});
         }
      });
   }
}