import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params, Data } from '@angular/router';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { AdminService } from '../../../services/admin.service';
import { AppSettings } from '../../../../../appSettings';
//import { NotificationsService } from '../../services/notifications.service';

@Component({
	selector: 'adminuserdetail',
	templateUrl: './adminuserdetail.html',
	styleUrls: ['adminuserdetail.css'],
})

export class adminuserdetailComponent {
	model: any = {};
	result: any;
	userData: any;
	cols: any[];
	totalRecords: number;

	userId:any;
	profileImagePath:any;

	constructor(
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private adminService: AdminService,
		private spinner: NgxSpinnerService,
		private messageService: MessageService,
		private confirmationService: ConfirmationService,
		//private notificationsService: NotificationsService
	) {
		//this.spinner.hide();
	}
	ngOnInit() {
		this.loadUserData();
	}

	loadUserData() {
		this.spinner.show();
		//console.log(this.route.snapshot.params);
		//this.userId = this.activatedRoute.snapshot.queryParams['id'];
		this.activatedRoute.params
      .subscribe(
        (params: Params) => {
          
          //this.id2 = +params['id2'];
          console.log("params ",params.id);
			 this.userId = params.id;
        }
      );
   // }
		//alert("userId ",this.userId)
		this.adminService.admin_load_userById(this.userId).subscribe((result) => {
			this.result = result;
		},
		(err) => this.spinner.hide(),
		() => {
			if (this.result.status === 'success') {
				this.userData = this.result.data;
				console.log(this.userData)
				//this.totalRecords = this.result.data.length;
				/*this.cols = [
					{ field: '_id', header: 'ID' },
					{ field: 'name', header: 'Name' },
					{ field: 'status', header: 'Status' },
					{ field: '', header: 'Action' }
				];*/
				this.profileImagePath = AppSettings.API_ENDPOINT+'/images/userPics/profilePic/'+this.userData._id+'/';
				this.spinner.hide();
			} else {
				this.spinner.hide();
				this.messageService.add({severity:'error', summary: 'Success', detail:this.result.message});
			}
		});
	}

	/*delete_user(userId){
		this.confirmationService.confirm({
			message: 'Are you sure that you want to proceed?',
			header: 'Confirm Delete',
			icon: 'pi pi-exclamation-triangle',
			accept: () => {
				//this.msgs = [{severity:'info', summary:'Confirmed', detail:'You have accepted'}];
				this.spinner.show();
				this.adminService.admin_delete_user(userId).subscribe((result) => {
					this.result = result;
				},
				(err) => this.spinner.hide(),
				() => {
				if (this.result.status === 'success') {
					this.spinner.hide();
					this.loadUsersData();
					this.messageService.add({severity:'success', summary: 'Success', detail:this.result.message});
				} else {
					this.spinner.hide();
					this.messageService.add({severity:'error', summary: 'Success', detail:this.result.message});
				}
			});
		},
			reject: () => {
				 //this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
			}
	  });
	}

	status_change(userId,currentStatus){ 
		this.confirmationService.confirm({
			message: 'Are you sure that you want to proceed?',
			header: 'Confirm Delete',
			icon: 'pi pi-exclamation-triangle',
			accept: () => {
				//this.msgs = [{severity:'info', summary:'Confirmed', detail:'You have accepted'}];
				this.spinner.show();
				this.adminService.admin_change_status(userId,currentStatus).subscribe((result) => {
					this.result = result;
				},
				(err) => this.spinner.hide(),
				() => {
				if (this.result.status === 'success') {
					this.spinner.hide();
					this.loadUsersData();
					this.messageService.add({severity:'success', summary: 'Success', detail:this.result.message});
				} else {
					this.spinner.hide();
					this.messageService.add({severity:'error', summary: 'Success', detail:this.result.message});
				}
			});
		},
			reject: () => {
				 //this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
			}
	  });
	}*/

}


