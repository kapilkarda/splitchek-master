import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, Data } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { AdminService } from '../../../../services/admin.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-detaildeduction',
  templateUrl: './detaildeduction.component.html',
  styleUrls: ['./detaildeduction.component.css']
})
export class DetaildeductionComponent implements OnInit {
	result: any;
	deductionData: any;
	totalRecords: number;
	//private unsubscribe$: Subject<any> = new Subject<any>();
	constructor(
		//private cdref: ChangeDetectorRef,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private adminService: AdminService,
		private _location: Location,
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
					// for (let datas of this.result.data) {
					// 		this.deductionData = datas.detail;
					// 		this.totalRecords = datas.detail.length;
					// 		console.log(this.totalRecords, 'length')
					// 		console.log(this.deductionData, "*Data*")
					// }
					this.deductionData = this.result.data
					
					this.spinner.hide();
				} else {
					this.spinner.hide();
					this.messageService.add({ severity: 'error', summary: 'Success', detail: this.result.message });
				}
			});
  }
  back(){
		this._location.back();
  }
}
