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
	selector: 'managecategory',
	templateUrl: './managecategory.html',
	styleUrls: ['managecategory.css'],
})

export class managecategoryComponent {
	model: any = {};
	result: any;
	categoryData: any;
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
		this.loadCategoryData();
	}

	

	loadCategoryData() { 
		console.log("hhhhhhhhhhhh")
		this.spinner.show();
		  this.adminService.adminGetCategoryList().subscribe((result) => {
			this.result = result;
		},
		(err) => this.spinner.hide(),
		() => {
			if (this.result.status === 'success') {
				this.categoryData = this.result.data;
				this.totalRecords = this.result.data.length;
				this.spinner.hide();
			} else {
				this.spinner.hide();
				this.messageService.add({severity:'error', summary: 'Success', detail:this.result.message});
			}
		});
	} 

	delete_category(categoryId){ 
		this.confirmationService.confirm({
			message: 'Are you sure that you want to delete this category?',
			header: 'Confirm Delete',
			icon: 'pi pi-exclamation-triangle',
			accept: () => {
				this.spinner.show();
				this.adminService.admin_delete_category(categoryId).subscribe((result) => {
					this.result = result;
				},
				(err) => this.spinner.hide(),
				() => {
				if (this.result.status === 'success') {
					this.spinner.hide();
					this.loadCategoryData();
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

	status_change(categoryId,currentStatus){ 
		this.confirmationService.confirm({
			message: 'Are you sure that you want to activate/deactivate this category?',
			header: 'Confirm Delete',
			icon: 'pi pi-exclamation-triangle',
			accept: () => {
				this.spinner.show();
				this.adminService.admin_change_category_status(categoryId,currentStatus).subscribe((result) => {
					this.result = result;
				},
				(err) => this.spinner.hide(),
				() => {
				if (this.result.status === 'success') {
					this.spinner.hide();
					this.loadCategoryData();
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