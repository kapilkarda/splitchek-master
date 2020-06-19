import { Component, OnInit, ElementRef, Inject } from '@angular/core';
import { Router, ActivatedRoute, Params, Data } from '@angular/router';
import { NgForm } from '@angular/forms';
import { DOCUMENT } from '@angular/common';
import * as $ from 'jquery';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { AdminService } from '../../services/admin.service';

@Component({
	selector: 'adminsidebar',
	templateUrl: './adminsidebar.html',
})

export class adminsidebarComponent implements OnInit {
	model: any = {};
	role: any;
	result: any;
	roleDataName: any;
	userName: any;
	img: any;
	profileName: any;
	constructor(
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private adminService: AdminService,
		private spinner: NgxSpinnerService,
		private messageService: MessageService,
		private elementRef: ElementRef,
		@Inject(DOCUMENT)
		private doc
	) { }

	ngOnInit() {
    this.loadRolesData();
		this.roleDataName = JSON.parse(localStorage.getItem('userInfo')).roleId;
    this.userName = JSON.parse(localStorage.getItem('userInfo')).name;
    console.log(localStorage.getItem('profileImg'))
    if(!localStorage.getItem('profileImg') || localStorage.getItem('profileImg')  == undefined || localStorage.getItem('profileImg')  == 'undefined' || localStorage.getItem('profileImg') == ''){

      this.img = '../../../assets/img/user2-160x160.jpg'
    }else{

		this.img = localStorage.getItem('profileImg')
    }
	}

	loadRolesData() {
		// console.log("hhhhhhhhhhhh")
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
							// console.log(this.roleDataName)
							localStorage.setItem('roleName', item.rolename)
						}
					}
					this.role = localStorage.getItem('roleName')
					console.log(this.role)
					this.spinner.hide();
				} else {
					this.spinner.hide();
					this.messageService.add({ severity: 'error', summary: 'Success', detail: this.result.message });
				}
			});
	}
}
