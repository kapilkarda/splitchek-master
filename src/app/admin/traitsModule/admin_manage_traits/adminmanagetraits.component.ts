import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params, Data } from '@angular/router';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { AdminService } from '../../../services/admin.service';
//import { NotificationsService } from '../../services/notifications.service';

@Component({
	selector: 'adminmanagetraits',
	templateUrl: './adminmanagetraits.html',
	styleUrls: ['adminmanagetraits.css'],
})

export class adminmanagetraitsComponent {
	model: any = {};
	result: any;
	traitData: any;
	cols: any[];
	totalRecords: number;

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
		this.loadTraitsData();
	}

	loadTraitsData() {
		this.spinner.show();
		this.adminService.admin_list_traits().subscribe((result) => {
			this.result = result;
		},
		(err) => this.spinner.hide(),
		() => {
			if (this.result.status === 'success') {
				this.traitData = this.result.data;
				console.log(this.traitData)
				this.totalRecords = this.result.data.length;
				this.cols = [
					{ field: '_id', header: 'ID' },
					{ field: 'name', header: 'Name' },
					{ field: 'status', header: 'Status' },
					{ field: '', header: 'Action' }
				];
				this.spinner.hide();
			} else {
				this.spinner.hide();
				this.messageService.add({severity:'error', summary: 'Success', detail:this.result.message});
			}
		});
	}

	delete_trait(traitId){
		//alert(traitId);
		this.confirmationService.confirm({
			message: 'Are you sure that you want to proceed?',
			header: 'Confirm Delete',
			icon: 'pi pi-exclamation-triangle',
			accept: () => {
				//this.msgs = [{severity:'info', summary:'Confirmed', detail:'You have accepted'}];
				this.spinner.show();
				this.adminService.admin_delete_traits(traitId).subscribe((result) => {
					this.result = result;
				},
				(err) => this.spinner.hide(),
				() => {
				if (this.result.status === 'success') {
					this.spinner.hide();
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

}


