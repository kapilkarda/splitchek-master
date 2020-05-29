import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params, Data } from '@angular/router';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { AdminService } from '../../../services/admin.service';

@Component({
	selector: 'admindashboard',
	templateUrl: './admindashboard.html',
	styleUrls: ['admindashboard.css'],
})

export class admindashboardComponent {
	model: any = {};
	result: any;
	rolesData: any;
	roleDataName: any;
	userlistData: any[];
	Registered: any;
	Comersial: any;
	usercountapp: any;
	formData = {
		id: "",
		isPostSide: 1
	}
	formDatas = {
		id: "",
		isPostSide: 0
	}
	constructor(
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private adminService: AdminService,
		private spinner: NgxSpinnerService,
		private messageService: MessageService,
	) {
		this.spinner.hide();
	}
	ngOnInit() {
		if (localStorage.getItem('token') == null && localStorage.getItem('token') == 'null') {
			this.router.navigate(['/']);
		}
		this.loadRolesData();
		this.loadFormData();
		this.loadpostData();
		this.userApp();
		this.roleDataName = JSON.parse(localStorage.getItem('userInfo')).roleId;
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
					for (let item of this.result.data) {
						if (this.roleDataName == item._id) {
							// item['username'] = it.name;
							console.log(this.roleDataName)
							localStorage.setItem('roleName', item.rolename)
						}
					}
					this.rolesData = this.result.data;
					console.log(this.rolesData, "RoleData")
					this.spinner.hide();
				} else {
					this.spinner.hide();
					this.messageService.add({ severity: 'error', summary: 'Success', detail: this.result.message });
				}
			});
	}
	loadFormData() {
		console.log("hhhhhhhhhhhh")
		this.spinner.show();
		this.adminService.getUserList().subscribe((result) => {
			this.result = result;
		},
			(err) => this.spinner.hide(),
			() => {
				if (this.result.status === 'success') {
					let obj = [];
					for (let value of this.result.data) {
						if (value.loginType != '5') {
							obj.push(value)
						}
					}
					this.userlistData = obj;
					this.Registered = this.userlistData.length
					console.log(this.Registered, "Data")

					this.spinner.hide();
				} else {
					this.spinner.hide();
					this.messageService.add({ severity: 'error', summary: 'Success', detail: this.result.message });
				}
			});
	}
	loadpostData() {
		console.log("hhhhhhhhhhhh")
		this.spinner.show();
		this.adminService.adminGetPostList(this.formData).subscribe((result) => {
			this.result = result;
		},
			(err) => this.spinner.hide(),
			() => {
				if (this.result.status === 'success') {
					this.Comersial = this.result.data.length;
					this.spinner.hide();
				} else {
					this.spinner.hide();
					this.messageService.add({ severity: 'error', summary: 'Success', detail: this.result.message });
				}
			});
	}

	userApp() {
		console.log("hhhhhhhhhhhh")
		this.spinner.show();
		this.adminService.adminGetPostList(this.formDatas).subscribe((result) => {
			this.result = result;
		},
			(err) => this.spinner.hide(),
			() => {
				if (this.result.status === 'success') {
					this.usercountapp = this.result.data.length;
					this.spinner.hide();
				} else {
					this.spinner.hide();
					this.messageService.add({ severity: 'error', summary: 'Success', detail: this.result.message });
				}
			});
	}
}
