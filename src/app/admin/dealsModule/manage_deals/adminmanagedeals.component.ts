import {Component} from '@angular/core';
import {Router, ActivatedRoute, Params, Data} from '@angular/router';
import {FormGroup, FormControl} from '@angular/forms';
import {DatePipe} from '@angular/common';
import {NgForm} from '@angular/forms';
import {NgxSpinnerService} from 'ngx-spinner';
import {MessageService} from 'primeng/api';
import {ConfirmationService} from 'primeng/api';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {AdminService} from '../../../services/admin.service';
import {AppSettings} from '../../../../../appSettings';
import {CustomValidators} from 'ng2-validation';

@Component({
	selector: 'adminmanagedeals',
	templateUrl: './adminmanagedeals.html',
	styleUrls: ['adminmanagedeals.css'],
})

export class adminmanagedealsComponent {
	model: any = {};
	result: any;
	dealsData: any;
	totalRecords: number;
	display: boolean = false;
	dealdata:any;
	dealImages:any;
	imagePath:any;

	constructor(
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private datePipe: DatePipe,
		private adminService: AdminService,
		private spinner: NgxSpinnerService,
		private messageService: MessageService,
		private confirmationService: ConfirmationService,
	) { }
	
	ngOnInit() {
		this.loadDealsData();
	}

	loadDealsData() {
		this.spinner.show();
		this.adminService.admin_list_deals().subscribe((result) => {
			this.result = result;
		},
		(err) => this.spinner.hide(),
		() => {
			if (this.result.status === 'success') {
				this.dealsData = this.result.data;
				this.totalRecords = this.result.data.length;
				this.spinner.hide();
			} else {
				this.spinner.hide();
				this.messageService.add({severity:'error', summary: 'Success', detail:this.result.message});
			}
		});
	}

	delete_deal(dealId){
		this.confirmationService.confirm({
			message: 'Are you sure that you want to delete this deal?',
			header: 'Confirm Delete',
			icon: 'pi pi-exclamation-triangle',
			accept: () => {
				this.spinner.show();
				this.adminService.admin_delete_deal(dealId).subscribe((result) => {
					this.result = result;
				},
				(err) => this.spinner.hide(),
				() => {
					if (this.result.status === 'success') {
						this.spinner.hide();
						this.loadDealsData();
						this.messageService.add({severity:'success', summary: 'Success', detail:this.result.message});
					} else {
						this.spinner.hide();
						this.messageService.add({severity:'error', summary: 'Success', detail:this.result.message});
					}
				});
			},
			reject: () => { }
	  	});
	}

	status_change(dealId,currentStatus){ 
		this.confirmationService.confirm({
			message: 'Are you sure that you want to activate/deactivate this deal?',
			header: 'Confirm Change Status',
			icon: 'pi pi-exclamation-triangle',
			accept: () => {
				this.spinner.show();
				this.adminService.admin_change_deal_status(dealId,currentStatus).subscribe((result) => {
					this.result = result;
				},
				(err) => this.spinner.hide(),
				() => {
					if (this.result.status === 'success') {
						this.spinner.hide();
						this.loadDealsData();
						this.messageService.add({severity:'success', summary: 'Success', detail:this.result.message});
					} else {
						this.spinner.hide();
						this.messageService.add({severity:'error', summary: 'Success', detail:this.result.message});
					}
				});
			},
			reject: () => { }
	  	});
	}

	showDialog(dealId) {
		this.loadDeals(dealId);
		this.display = true;
  	}

	loadDeals(dealId){ 
		if (dealId !== undefined) {
			this.adminService.admin_load_dealData(dealId).subscribe(dealdata => {
				if (dealdata.status === 'success') {
					this.dealdata = dealdata.data;
					this.dealdata.expireOn = this.datePipe.transform(this.dealdata.expireOn, 'yyyy-MM-dd');
					this.model = this.dealdata;
					this.dealImages = this.dealdata.dealImages;
					this.imagePath = AppSettings.API_ENDPOINT+'/images/admin/dealsPics/';
				}
			});
		}
	}

	update_order() {
		this.spinner.show();
		this.adminService.admin_update_deal_order(this.model).subscribe(result => {
			this.result = result;
			if (this.result.status === 'success') {
				this.spinner.hide();
				this.messageService.add({ severity: 'success', summary: 'Success', detail: this.result.message });
				this.display = false;
				this.loadDealsData();
			} else {
				this.spinner.hide();
				this.messageService.add({ severity: 'error', summary: 'Error', detail: this.result.message });
			}
		});
	}
}