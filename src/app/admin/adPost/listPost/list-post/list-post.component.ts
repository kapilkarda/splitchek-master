import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, Data } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { AdminService } from '../../../../services/admin.service';

@Component({
	selector: 'app-list-post',
	templateUrl: './list-post.component.html',
	styleUrls: ['./list-post.component.css']
})
export class ListPostComponent implements OnInit {
	model: any = {};
	result: any;
	postData: any;
	totalRecords: number;
	display: boolean = false;
	fieldData: any;
	fieldTitle: any;
	category: any;
	selectedValues: any[] = ['1']
	formData = {
		id: "",
    isPostSide: 1
	}
	catId: any = [];
	Customer: any;
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
		this.loadUserData();
		this.loadCategoryData();
	}
	loadCategoryData() {
		console.log("hhhhhhhhhhhh")
		this.spinner.show();
		this.adminService.adminGetCategoryList().subscribe((result) => {
			this.result = result;
			console.log(this.result.data)
		},
			(err) => this.spinner.hide(),
			() => {
				if (this.result.status === 'success') {
					this.category = this.result.data;

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
          console.log(this.Customer)

		      this.loadpostData();
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
          for(let item of this.result.data){
            for(let it of this.Customer){
              if (it._id == item.userId) {
                item['username'] = it.name;
              }
            }
          }
					this.postData = this.result.data;
					console.log(this.postData)
					this.totalRecords = this.result.data.length;

					this.spinner.hide();
				} else {
					this.spinner.hide();
					this.messageService.add({ severity: 'error', summary: 'Success', detail: this.result.message });
				}
			});
	}

	delete_category(id, isdeleted) {
		let data = {
			"id": id,
		}
		this.confirmationService.confirm({
			message: 'Are you sure that you want to delete this post?',
			header: 'Confirm Delete',
			icon: 'pi pi-exclamation-triangle',
			accept: () => {
				this.spinner.show();
				this.adminService.admin_delete_post(data).subscribe((result) => {
					this.result = result;
				},
					(err) => this.spinner.hide(),
					() => {
						if (this.result.status === 'success') {
							this.spinner.hide();
							this.loadpostData();
							this.messageService.add({ severity: 'success', summary: 'Success', detail: this.result.message });
						} else {
							this.spinner.hide();
							this.messageService.add({ severity: 'error', summary: 'Success', detail: this.result.message });
						}
					});
			},
			reject: () => {
			}
		});
	}
	show(data) {
		console.log("datacheck", data)
		this.display = true;
		this.fieldData = data.field;
		this.fieldTitle = data.form_name
	}
	status_change(categoryId, currentStatus) {


		this.confirmationService.confirm({
			message: 'Are you sure that you want to activate/deactivate this post?',
			header: 'Confirm Delete',
			icon: 'pi pi-exclamation-triangle',
			accept: () => {
				this.spinner.show();
				let data = {
					"id": categoryId,
					"status": currentStatus

				}
				this.adminService.updatePostStatus(data).subscribe((result) => {
					this.result = result;
				},
					(err) => this.spinner.hide(),
					() => {
						if (this.result.status === 'success') {
							this.spinner.hide();
							this.loadpostData();
							this.messageService.add({ severity: 'success', summary: 'Success', detail: this.result.message });
						} else {
							this.spinner.hide();
							this.messageService.add({ severity: 'error', summary: 'Success', detail: this.result.message });
						}
					});
			},
			reject: () => {
			}
		});
	}
	featurePost(id, featured) {

		console.log(id, featured)
		this.confirmationService.confirm({
			message: 'Are you sure that you want to Featured/Unfeatured this post?',
			header: 'Confirm Delete',
			icon: 'pi pi-exclamation-triangle',
			accept: () => {
				this.spinner.show();
				let data = {
					"id": id,
					"featured": featured

				}
				this.adminService.updatePostFeatured(data).subscribe((result) => {
					this.result = result;
				},
					(err) => this.spinner.hide(),
					() => {
						if (this.result.status === 'success') {
							this.spinner.hide();
							this.loadpostData();
							this.messageService.add({ severity: 'success', summary: 'Success', detail: this.result.message });
						} else {
							this.spinner.hide();
							this.messageService.add({ severity: 'error', summary: 'Success', detail: this.result.message });
						}
					});
			},
			reject: () => {
			}
		});
	}

	getCatData(e) {
		this.formData.id = e._id;
		this.loadpostData()
	}

	getUser(id) {
		for (let k of this.Customer) {
			if (k._id == id) {
				// console.log(k)
				return k.name
			}
		}
	}
	chkArray(val) {
		return Array.isArray(val);
	}
	parseVal(val) {
		console.log(val)
		return JSON.stringify(val)
	}
}
