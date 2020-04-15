import {Component} from '@angular/core';
import {Router,ActivatedRoute,Params,Data} from '@angular/router';
import {NgForm} from '@angular/forms';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {NgxSpinnerService} from 'ngx-spinner';
import {MessageService} from 'primeng/api';
import {ConfirmationService} from 'primeng/api';
//import {AdminService} from '../../../services/admin.service';
import {AdminService} from '../../../services/admin.service';
//import {UserService} from '../../../_services/user.service';
//import { Subject } from 'rxjs';

@Component({
	selector: 'managecategory',
	templateUrl: './managecategory.html',
	styleUrls: ['managecategory.css'],
})

export class managecategoryComponent {
	model: any = {};
	result: any;
	categoryData: any;
  totalRecords: number;

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
		this.loadCategoryData();
	}


  
	loadCategoryData() {
		console.log("hhhhhhhhhhhh")
    this.spinner.show();
		  this.adminService.adminGetPagedCategoryList().subscribe((result) => {
      this.result = result;
      console.log(this.result.data)
		},
		(err) => this.spinner.hide(),
		() => {
			if (this.result.status === 'success') {
				this.totalRecords = this.result.data.length;
				for(let item of this.result.data){
					let mobj = []
					item['child'] = this.ShowSubCatData(item.subCat);
					mobj = this.getIDArr(item.subCat);
					let obj = {
						id:item._id,
						status:item.status
					}
					console.log(mobj)
					mobj.push(obj)
					item['idArr'] = mobj;
				}
				
				this.categoryData = this.result.data;

				this.spinner.hide();
			} else {
				this.spinner.hide();
				this.messageService.add({severity:'error', summary: 'Success', detail:this.result.message});
			}
		});
	}

	delete_category(categoryId){
		this.confirmationService.confirm({
			message: 'Are you sure that you want to delete this category?',
			header: 'Confirm Delete',
			icon: 'pi pi-exclamation-triangle',
			accept: () => {
				this.spinner.show();
				this.adminService.admin_delete_category(categoryId).subscribe((result) => {
					this.result = result;
				},
				(err) => this.spinner.hide(),
				() => {
				if (this.result.status === 'success') {
					this.spinner.hide();
					this.loadCategoryData();
					this.messageService.add({severity:'success', summary: 'Success', detail:this.result.message});
				} else {
					this.spinner.hide();
					this.messageService.add({severity:'error', summary: 'Success', detail:this.result.message});
				}
			});
		},
			reject: () => {
			}
	  });
	}

	status_change(categoryId){
		this.confirmationService.confirm({
			message: 'Are you sure that you want to activate/deactivate this category?',
			header: 'Confirm Delete',
			icon: 'pi pi-exclamation-triangle',
			accept: () => {
				this.spinner.show();
				this.adminService.admin_change_category_status(categoryId).subscribe((result) => {
					this.result = result;
				},
				(err) => this.spinner.hide(),
				() => {
				if (this.result.status === 'success') {
					this.spinner.hide();
					this.loadCategoryData();
					this.messageService.add({severity:'success', summary: 'Success', detail:this.result.message});
				} else {
					this.spinner.hide();
					this.messageService.add({severity:'error', summary: 'Success', detail:this.result.message});
				}
			});
		},
			reject: () => {
			}
	  });
	}
	ShowSubCatData(data){
		let arr = [];
		for(let item of data){
			let obj = {
				"label":item.name,
				"data":item.name,
				"children":[]
			}
			if(item.subCat){
				let d = this.showSubtosub(item.subCat)
				obj.children = d;
			}
			
			arr.push(obj)
		}
		let vs = arr;
		console.log(vs)
		return vs;
	}
	showSubtosub(data){
		let arr = [];
		for(let item of data){
			let obj = {
				"label":item.name,
				"data":item.name,
				"children":[]
			}
			if(item.subCat){
				let d = this.showSubtosub(item.subCat)
				obj.children = d;
			}
			
			arr.push(obj)
		}
		return arr;
	}
	getIDArr(data){
		let arr =[];
		for(let item of data){
			let obj = {
				id:item._id,
				status:item.status
			}
			
			arr.push(item._id);
			if(item.subCat){
				let d = this.getSubId(item.subCat)
				arr.push(d);
			}
		}
		return arr;
	}
	getSubId(data){
		let arr =[];
		for(let item of data){
			let obj = {
				id:item._id,
				status:item.status
			}
			
			arr.push(item._id);
			if(item.subCat){
				let d = this.getSubId(item.subCat)
				arr.push(d);
			}
		}
		return arr;
	}
}
