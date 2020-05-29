import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, Data } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { AdminService } from '../../../../services/admin.service';
import { Location } from '@angular/common';

@Component({
	selector: 'app-add-plan',
	templateUrl: './add-plan.component.html',
	styleUrls: ['./add-plan.component.css']
})
export class AddPlanComponent implements OnInit {
	model: any = {
		'kd': '',
		'kwd': ''
	};
	result: any;



	constructor(
		private router: Router,
		private adminService: AdminService,
		private spinner: NgxSpinnerService,
		private messageService: MessageService,
		private _location: Location,
	) { }

	ngOnInit() {
		if (localStorage.getItem('token') == null && localStorage.getItem('token') == 'null') {
			this.router.navigate(['/']);
		}
	}


	add_plan() {
		this.spinner.show();
		this.adminService.admin_add_plan(this.model).subscribe(result => {
			this.result = result;
		},
			(err) => console.log(err),
			() => {
				if (this.result.status === 'success') {
					this.spinner.hide();
					this.messageService.add({ severity: 'success', summary: 'Success', detail: this.result.message });
					this.router.navigate(['/admin/listPlan']);
				} else {
					this.spinner.hide();
					this.messageService.add({ severity: 'error', summary: 'Error', detail: this.result.message });
				}
			});
	}
	back() {
		this._location.back();
	}
}
