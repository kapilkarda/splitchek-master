import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params, Data } from '@angular/router';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService} from 'primeng/api';
import { AdminService } from '../../../services/admin.service';
//import { NotificationsService } from '../../services/notifications.service';

@Component({
    selector: 'admindashboard',
    templateUrl: './admindashboard.html',
    styleUrls: ['admindashboard.css'],
})

export class admindashboardComponent {
   model: any = {};
   result: any;
	
	constructor(
      private router: Router,
      private activatedRoute: ActivatedRoute,
      private adminService: AdminService,
      private spinner: NgxSpinnerService,
      private messageService: MessageService,
      //private notificationsService: NotificationsService
   ) {
      this.spinner.hide();
   }
   ngOnInit() {
   	this.registeredUsersCount();
	}

   registeredUsersCount() {
		this.spinner.show();
		this.adminService.admin_dashboard().subscribe((result) => {
			this.result = result;
		},
		(err) => this.spinner.hide(),
		() => {
			if (this.result.status === 'success') {
				//this.invitesData = this.result.data;
				//console.log("invitesData ",this.invitesData)
				//this.totalRecords = this.result.data.length;
				console.log("result ",this.result)
				this.spinner.hide();
			} else {
				this.spinner.hide();
				this.messageService.add({severity:'error', summary: 'Success', detail:this.result.message});
			}
		});
	}
}


