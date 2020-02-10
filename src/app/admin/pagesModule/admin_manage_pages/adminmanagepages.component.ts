import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params, Data } from '@angular/router';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { AdminService } from '../../../services/admin.service';

@Component({
	selector: 'adminmanagepages',
	templateUrl: './adminmanagepages.html',
	styleUrls: ['adminmanagepages.css'],
})

export class adminmanagepagesComponent {
	model: any = {};
	result: any;
	pagesData: any;
	totalRecords: number;

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
		this.loadPagesData();
	}

	loadPagesData() {
		this.spinner.show();
		this.adminService.admin_list_pages().subscribe((result) => {
			this.result = result;
		},
		(err) => this.spinner.hide(),
		() => {
			if (this.result.status === 'success') {
				this.pagesData = this.result.data;
				console.log("pagesData ",this.pagesData)
				this.totalRecords = this.result.data.length;
				this.spinner.hide();
			} else {
				this.spinner.hide();
				this.messageService.add({severity:'error', summary: 'Success', detail:this.result.message});
			}
		});
	}

	delete_page(pageId){
		this.confirmationService.confirm({
			message: 'Are you sure that you want to proceed?',
			header: 'Confirm Delete',
			icon: 'pi pi-exclamation-triangle',
			accept: () => {
				this.spinner.show();
				this.adminService.admin_delete_page(pageId).subscribe((result) => {
					this.result = result;
				},
				(err) => this.spinner.hide(),
				() => {
				if (this.result.status === 'success') {
					this.spinner.hide();
					this.loadPagesData();
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

	status_change(pageId,currentStatus){ 
		this.confirmationService.confirm({
			message: 'Are you sure that you want to proceed?',
			header: 'Confirm Change Status',
			icon: 'pi pi-exclamation-triangle',
			accept: () => {
				//this.msgs = [{severity:'info', summary:'Confirmed', detail:'You have accepted'}];
				this.spinner.show();
				this.adminService.admin_change_page_status(pageId,currentStatus).subscribe((result) => {
					this.result = result;
				},
				(err) => this.spinner.hide(),
				() => {
				if (this.result.status === 'success') {
					this.spinner.hide();
					this.loadPagesData();
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


