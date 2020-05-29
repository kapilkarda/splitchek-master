import {Component,ChangeDetectorRef} from '@angular/core';
import {Router,ActivatedRoute,Params,Data} from '@angular/router';
import {NgForm} from '@angular/forms';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {NgxSpinnerService} from 'ngx-spinner';
import {MessageService} from 'primeng/api';
import {ConfirmationService} from 'primeng/api';
import {AdminService} from '../../../services/admin.service';
//import {RoleService} from '../../../_services/role.service';
//import { Subject } from 'rxjs';

@Component({
	selector: 'manageroles',
	templateUrl: './manageroles.html',
	styleUrls: ['manageroles.css'],
})

export class managerolesComponent {
	model: any = {};
	result: any;
	rolesData: any;
	totalRecords: number;
	
	//private unsubscribe$: Subject<any> = new Subject<any>();
	constructor(
		//private cdref: ChangeDetectorRef,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private adminService: AdminService,
		private spinner: NgxSpinnerService,
		private messageService: MessageService,
		private confirmationService: ConfirmationService,
		private changeDetectorRef: ChangeDetectorRef
	) {
		
	}
	ngOnInit() {
		this.loadRolesData();
	}

	

	loadRolesData() { 
		console.log("hhhhhhhhhhhh")
		this.spinner.show();
		  this.adminService.adminGetRolesList().subscribe((result) => {
			this.result = result;
		},
		(err) => this.spinner.hide(),
		() => {
			if (this.result.status === 'success') {
				this.rolesData = this.result.data;
				// console.log(this.rolesData,"Data")
				this.totalRecords = this.result.data.length;
				this.spinner.hide();
			} else {
				this.spinner.hide();
				this.messageService.add({severity:'error', summary: 'Success', detail:this.result.message});
			}
		});
	} 

	delete_role(roleId){ 
		
		this.confirmationService.confirm({
			message: 'Are you sure that you want to delete this role?',
			header: 'Confirm Delete',
			icon: 'pi pi-exclamation-triangle',
			accept: () => {
				this.spinner.show();
				this.adminService.admin_delete_role(roleId).subscribe((result) => {
					this.result = result;
				},
				(err) => this.spinner.hide(),
				() => {
				if (this.result.status === 'success') {
					this.spinner.hide();
					this.loadRolesData();
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

	status_change(roleId,currentStatus){ 
		this.confirmationService.confirm({
			message: 'Are you sure that you want to activate/deactivate this role?',
			header: 'Confirm Delete',
			icon: 'pi pi-exclamation-triangle',
			accept: () => {
				// let data = {
				// 	"userid":roleId,
				// 	"status":currentStatus
				// }
				// console.log(data)
				this.spinner.show();
				this.adminService.admin_change_role_status(roleId,currentStatus).subscribe((result) => {
					this.result = result;
				},
				(err) => this.spinner.hide(),
				() => {
				if (this.result.status === 'success') {
					this.spinner.hide();
					this.loadRolesData();
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
}