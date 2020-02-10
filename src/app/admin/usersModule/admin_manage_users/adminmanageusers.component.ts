import {Component} from '@angular/core';
import {Router,ActivatedRoute,Params,Data} from '@angular/router';
import {NgForm} from '@angular/forms';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {NgxSpinnerService} from 'ngx-spinner';
import {MessageService} from 'primeng/api';
import {ConfirmationService} from 'primeng/api';
import {AdminService} from '../../../services/admin.service';

@Component({
	selector: 'adminmanageusers',
	templateUrl: './adminmanageusers.html',
	styleUrls: ['adminmanageusers.css'],
})

export class adminmanageusersComponent {
	model: any = {};
	result: any;
	userData: any;
	totalRecords: number;
	display: boolean = false;
	userdata:any;

	constructor(
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private adminService: AdminService,
		private spinner: NgxSpinnerService,
		private messageService: MessageService,
		private confirmationService: ConfirmationService,
	) {
		
	}
	ngOnInit() {
		this.loadUsersData();
	}

	loadUsersData() {
		this.spinner.show();
		this.adminService.admin_list_users().subscribe((result) => {
			this.result = result;
		},
		(err) => this.spinner.hide(),
		() => {
			if (this.result.status === 'success') {
				this.userData = this.result.data;
				this.totalRecords = this.result.data.length;
				this.spinner.hide();
			} else {
				this.spinner.hide();
				this.messageService.add({severity:'error', summary: 'Success', detail:this.result.message});
			}
		});
	}

	delete_user(userId){
		this.confirmationService.confirm({
			message: 'Are you sure that you want to proceed?',
			header: 'Confirm Delete',
			icon: 'pi pi-exclamation-triangle',
			accept: () => {
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
			}
	  });
	}

	status_change(userId,currentStatus){ 
		this.confirmationService.confirm({
			message: 'Are you sure that you want to proceed?',
			header: 'Confirm Delete',
			icon: 'pi pi-exclamation-triangle',
			accept: () => {
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
			}
	  });
	}
	loadUser(userId){ 
		//this.dealId = this.activatedRoute.snapshot.queryParams['id'];
		if (userId !== undefined) {
			this.adminService.admin_load_userData(userId).subscribe(userdata => {
				if (userdata.status === 'success') {
					this.userdata = userdata.data;
					//this.dealdata.expireOn = this.datePipe.transform(this.dealdata.expireOn, 'yyyy-MM-dd');
					this.model = this.userdata;
					//this.dealImages = this.dealdata.dealImages;
					//this.imagePath = AppSettings.API_ENDPOINT+'/images/admin/dealsPics/';
					//console.log("dataaaaaaaaaaaaa")
				}
			});
		}
	}
	showDialog(userId) { 
		this.loadUser(userId);
		this.display = true;
  }

  suspend_user() {
	this.spinner.show();
	this.adminService.admin_suspend_user(this.model).subscribe(result => {
		this.result = result;
		if (this.result.status === 'success') {
			this.spinner.hide();
			this.messageService.add({ severity: 'success', summary: 'Success', detail: this.result.message });
			//this.router.navigate(['/admin/managedeals']);
			this.display = false;
			this.loadUsersData();
		} else {
			this.spinner.hide();
			this.messageService.add({ severity: 'error', summary: 'Error', detail: this.result.message });
		}
	});
}

}