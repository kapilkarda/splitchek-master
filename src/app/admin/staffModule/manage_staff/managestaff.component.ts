import {Component} from '@angular/core';
import {Router,ActivatedRoute,Params,Data} from '@angular/router';
import {NgForm} from '@angular/forms';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {NgxSpinnerService} from 'ngx-spinner';
import {MessageService} from 'primeng/api';
import {ConfirmationService} from 'primeng/api';
//import {AdminService} from '../../../services/admin.service';
import {AdminService} from '../../../services/admin.service';
//import {UserService} from '../../../_services/user.service';
//import { Subject } from 'rxjs';

@Component({
	selector: 'managestaff',
	templateUrl: './managestaff.html',
	styleUrls: ['managestaff.css'],
})

export class managestaffComponent {
	model: any = {};
	result: any;
	staffData: any;
	totalRecords: number;
	
	//private unsubscribe$: Subject<any> = new Subject<any>();
	constructor(
		//private cdref: ChangeDetectorRef,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private adminService: AdminService,
		//private userService: UserService,
		
		private spinner: NgxSpinnerService,
		private messageService: MessageService,
		private confirmationService: ConfirmationService
	) {
		
	}
	ngOnInit() {
		this.loadStaffData();
	}

	

	loadStaffData() { 
		console.log("hhhhhhhhhhhh")
		this.spinner.show();
		  this.adminService.adminGetStaffList().subscribe((result) => {
			this.result = result;
		},
		(err) => this.spinner.hide(),
		() => {
			if (this.result.status === 'success') {
				this.staffData = this.result.data;
				this.totalRecords = this.result.data.length;
				this.spinner.hide();
			} else {
				this.spinner.hide();
				this.messageService.add({severity:'error', summary: 'Success', detail:this.result.message});
			}
		});
	} 

	 delete_staff(staffId){ 
		console.log("dele")
		 this.confirmationService.confirm({
			message: 'Are you sure that you want to delete this staff?',
			header: 'Confirm Delete',
			icon: 'pi pi-exclamation-triangle',
			accept: () => {
				this.spinner.show();
				this.adminService.admin_delete_staff(staffId).subscribe((result) => {
					this.result = result;
				},
				(err) => this.spinner.hide(),
				() => {
				if (this.result.status === 'success') {
					this.spinner.hide();
					this.loadStaffData();
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

	 status_change(staffId,currentStatus){ 
		this.confirmationService.confirm({
			message: 'Are you sure that you want to activate/deactivate this staff?',
			header: 'Confirm Delete',
			icon: 'pi pi-exclamation-triangle',
			accept: () => {
				this.spinner.show();
				this.adminService.admin_change_staff_status(staffId,currentStatus).subscribe((result) => {
					this.result = result;
				},
				(err) => this.spinner.hide(),
				() => {
				if (this.result.status === 'success') {
					this.spinner.hide();
					this.loadStaffData();
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

	/* ngOnDestroy() { alert("des")
		this.changeDetectorRef.detach();
		// this.subscription.unsubscribe();
  } */

	/* loadUser(userId){ 
		if (userId !== undefined) {
			this.adminService.admin_load_userData(userId).subscribe(userdata => {
				if (userdata.status === 'success') {
					this.userdata = userdata.data;
					this.model = this.userdata;
				}
			});
		}
	} */
	
	/* showDialog(userId) { 
		this.loadUser(userId);
		this.display = true;
  	} */

  	/* suspend_user() {
		this.spinner.show();
		this.adminService.admin_suspend_user(this.model).subscribe(result => {
			this.result = result;
			if (this.result.status === 'success') {
				this.spinner.hide();
				this.messageService.add({ severity: 'success', summary: 'Success', detail: this.result.message });
				this.display = false;
				this.loadUsersData();
			} else {
				this.spinner.hide();
				this.messageService.add({ severity: 'error', summary: 'Error', detail: this.result.message });
			}
		});
	} */
}