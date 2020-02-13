import {Component} from '@angular/core';
import {Router,ActivatedRoute,Params,Data} from '@angular/router';
import {NgForm} from '@angular/forms';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {NgxSpinnerService} from 'ngx-spinner';
import {MessageService} from 'primeng/api';
import {ConfirmationService} from 'primeng/api';
import {AdminService} from '../../../services/admin.service';

@Component({
	selector: 'adminmanagesuspendedusers',
	templateUrl: './adminmanagesuspendedusers.html',
	styleUrls: ['adminmanagesuspendedusers.css'],
})

export class adminmanagesuspendedusersComponent {
	model: any = {};
	result: any;
	userData: any;
	totalRecords: number;
	//display: boolean = false;
	//userdata:any;

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
		this.loadSuspendedUsersData();
	}

	loadSuspendedUsersData() {
		this.spinner.show();
		this.adminService.admin_list_suspended_users().subscribe((result) => {
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
}