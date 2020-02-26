import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params, Data } from '@angular/router';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { AdminService } from '../../../services/admin.service';

@Component({
	selector: 'adminmanageblockeduser',
	templateUrl: './adminmanageblockeduser.html',
	styleUrls: ['adminmanageblockeduser.css'],
})

export class adminmanageblockeduserComponent {
	model: any = {};
	result: any;
	reportedData: any;
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
		this.loadblockedusersData();
	}

	loadblockedusersData() {
		this.spinner.show();
		this.adminService.admin_list_blockedusers().subscribe((result) => {
			this.result = result;
		},
		(err) => this.spinner.hide(),
		() => {
			if (this.result.status === 'success') {
				this.reportedData = this.result.data;
				this.totalRecords = this.result.data.length;
				this.spinner.hide();
			} else {
				this.spinner.hide();
				this.messageService.add({severity:'error', summary: 'Success', detail:this.result.message});
			}
		});
	}

	

	
}