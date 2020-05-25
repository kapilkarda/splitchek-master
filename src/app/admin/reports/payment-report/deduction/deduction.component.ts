import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params, Data } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { AdminService } from '../../../../services/admin.service';

@Component({
	selector: 'app-deduction',
	templateUrl: './deduction.component.html',
	styleUrls: ['./deduction.component.css']
})
export class DeductionComponent implements OnInit {

	model: any = {};
	result: any;
	deductionData: any;
	totalRecords: number;
	display: boolean = false;
	Customer: any = [];
	detailData: any;
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
		if (localStorage.getItem('token') == null && localStorage.getItem('token') == 'null') {
			this.router.navigate(['/']);
		}
		this.loadFormData();
		this.loadUserData();
	}

	ngOnDestroy() {

	}

	loadFormData() {
		console.log("hhhhhhhhhhhh")
		this.spinner.show();
		this.adminService.deduction().subscribe((result) => {
			this.result = result;
		},
			(err) => this.spinner.hide(),
			() => {
				if (this.result.status === 'success') {
					this.deductionData = this.result.data
					console.log(this.deductionData, "**")
					this.spinner.hide();
				} else {
					this.spinner.hide();
					this.messageService.add({ severity: 'error', summary: 'Success', detail: this.result.message });
				}
			});
	}
	loadUserData() {
		console.log("hhhhhhhhhhhh")
		this.spinner.show();
		this.adminService.getUserList().subscribe((result) => {
			this.result = result;
		},
			(err) => this.spinner.hide(),
			() => {
				if (this.result.status === 'success') {

					this.Customer = this.result.data;
					console.log(this.Customer, "data")
					this.spinner.hide();
				} else {
					this.spinner.hide();
					this.messageService.add({ severity: 'error', summary: 'Success', detail: this.result.message });
				}
			});
	}
	getUser(id) {
		for (let k of this.Customer) {
			if (k._id == id) {
				// console.log(k, "value")
				return k.name
			}
		}
	}
	getBounce(id) {
		for (let b of this.Customer) {
			if (b._id == id) {
				return ('kd=' + b.kd + ' , ' + 'Kwd=' + b.kwd)
			}
		}
	}
	getPlan(id) {
		for (let p of this.Customer) {
			if (p._id == id) {
				return ('kd=' + p.real_amount_kd + ' , ' + 'Kwd=' + p.real_amount_kwd)
			}
		}
	}
	detail(data) {
		// console.log("datacheck", data)
		this.display = true;
		this.detailData = data.detail;
  }
}