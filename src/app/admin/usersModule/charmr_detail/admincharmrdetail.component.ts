import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params, Data } from '@angular/router';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { AdminService } from '../../../services/admin.service';
import { AppSettings } from '../../../../../appSettings';

@Component({
	selector: 'admincharmrdetail',
	templateUrl: './admincharmrdetail.html',
	styleUrls: ['admincharmrdetail.css'],
})

export class admincharmrdetailComponent {
	model: any = {};
	result: any;
	userPetsData: any;
	userId:any;
	profileImagePath:any;
	petsData:any;

	constructor(
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private adminService: AdminService,
		private spinner: NgxSpinnerService,
		private messageService: MessageService,
		private confirmationService: ConfirmationService,
	) { }
	
	ngOnInit() {
		this.loadCharmrData();
	}

	loadCharmrData() {
		this.spinner.show();
		this.activatedRoute.params
      .subscribe(
      	(params: Params) => {
         	this.userId = params.id;
        	}
      );
   	this.adminService.admin_load_petsByuserId(this.userId).subscribe((result) => {
			this.result = result;
		},
		(err) => this.spinner.hide(),
		() => {
			if (this.result.status === 'success') {
				this.userPetsData = this.result.data;
				this.petsData = this.result.data.pets;
				console.log("dddddddddd ",this.petsData)
				console.log("userdata ", this.userPetsData)
				this.profileImagePath = AppSettings.API_ENDPOINT+'/images/userPics/profilePic/'+this.userPetsData._id+'/';
				this.spinner.hide();
			} else {
				this.spinner.hide();
				this.messageService.add({severity:'error', summary: 'Success', detail:this.result.message});
			}
		});
	}
}