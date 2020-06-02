import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params, Data } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { AdminService } from '../../../services/admin.service';
import * as moment from 'moment';

@Component({
	selector: 'app-listticket',
	templateUrl: './listticket.component.html',
	styleUrls: ['./listticket.component.css']
})
export class ListticketComponent implements OnInit {
	model: any = {};
	result: any;
	ticketlistData: any;
	totalRecords: number;
	display: boolean = false;
	// fieldData: any;
	Customer: any = [];
	postData: any = [];
	reply: any = [];
	category: any;
	// fieldTitle: any;
	catId: any;
	input: String;
	formData = {
		id: ""
	}
	detailData: any= [];
	textArea: any =[];
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


		// this.loadFormData();
		// this.loadpostData();

	}

	ngOnDestroy() {

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
					// console.log(this.Customer)

					this.loadFormData();
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
		this.adminService.getTIcketList().subscribe((result) => {
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
					this.ticketlistData = this.result.data;
					this.totalRecords = this.result.data.length;
					// console.log(this.ticketlistData,"**")
					for(let value of this.result.data){
						this.textArea =value.content.description
						// console.log(this.textArea)
					}


					console.log(this.ticketlistData, "data")
					this.spinner.hide();
				} else {
					this.spinner.hide();
					this.messageService.add({ severity: 'error', summary: 'Success', detail: this.result.message });
				}
			});
	}
	showStatus(data){
		// console.log(data.ticketStatus,"---->")
		localStorage.setItem("getStatus",data.ticketStatus)
	}

	// loadpostData() {
	// 	console.log("hhhhhhhhhhhh")
	// 	this.spinner.show();
	// 	this.adminService.adminGetPostList(this.formData).subscribe((result) => {
	// 		this.result = result;
	// 	},
	// 		(err) => this.spinner.hide(),
	// 		() => {
	// 			if (this.result.status === 'success') {
	// 				this.postData = this.result.data;
	// 				// console.log(this.totalRecords ,"post")
	// 				this.spinner.hide();
	// 			} else {
	// 				this.spinner.hide();
	// 				this.messageService.add({ severity: 'error', summary: 'Success', detail: this.result.message });
	// 			}
	// 		});
	// }
	formatDate(date){
		return moment(date).format('DD/MM/YYYY')
	  }
	// getUser(id) {
	// 	for (let k of this.Customer) {
	// 		if (k._id == id) {
	// 			// console.log(k,"value")
	// 			return k.name
	// 		}
	// 	}
	// }
	// getTitle(id) {
	// 	for (let t of this.postData) {
	// 		// console.log(t.productTitle ,"title")
	// 		return t.productTitle
	// 	}
	// }
	status_change(id, ticketStatus) {
		this.confirmationService.confirm({
			message: 'Are you sure that you want to Change this Ticket Status?',
			header: 'Confirm Delete',
			icon: 'pi pi-exclamation-triangle',
			accept: () => {
				this.spinner.show();
				let data = {
					"id": id,
					"ticketStatus": ticketStatus

				}
				console.log(data)
				this.adminService.admin_update_Ticket(data).subscribe((result) => {
					this.result = result;
				},
					(err) => this.spinner.hide(),
					() => {
						if (this.result.status === 'success') {
							this.spinner.hide();
							this.loadFormData();
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

	delete_form(id, isDeleted) {
		this.confirmationService.confirm({
			message: 'Are you sure that you want to delete this Ticket?',
			header: 'Confirm Delete',
			icon: 'pi pi-exclamation-triangle',
			accept: () => {
				let data = {
					"id": id
				}
				this.spinner.show();
				this.adminService.admin_delete_Ticket(data).subscribe((result) => {
					this.result = result;
				},
					(err) => this.spinner.hide(),
					() => {
						if (this.result.status === 'success') {
							this.spinner.hide();
							this.loadFormData();
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
	MessageView(data) {
    this.detailData = []
    this.display = true;
    if(data.answer.length >0){
		// this.detailData.push(data.content);
      this.detailData = data.answer;
    }else{
      this.detailData.push(data.content);
    }
		console.log(this.detailData)
	}
	refresh(){
		this.loadFormData();
	  }
}
