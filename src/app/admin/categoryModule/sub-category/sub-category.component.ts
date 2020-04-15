import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
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
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.css']
})
export class SubCategoryComponent implements OnInit {
	model: any = {};
	result: any;
	categoryData: any;
  totalRecords: number;
  categoryId:any;
	catName:any;
	AllCats:any=[];
	//private unsubscribe$: Subject<any> = new Subject<any>();
	constructor(
		//private cdref: ChangeDetectorRef,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private adminService: AdminService,
		//private userService: UserService,

		private spinner: NgxSpinnerService,
		private messageService: MessageService,
		private confirmationService: ConfirmationService,
		private _location: Location
	) {

	}
	ngOnInit() {this.activatedRoute.params
    .subscribe(
          (params: Params) => {
			this.categoryId = params['id'];
			this.catName = params['name'];
			if(localStorage.getItem('breadcrumb')){
				this.AllCats = JSON.parse(localStorage.getItem('breadcrumb'));
			}
			let obj = {
				name:this.catName,
				id:this.categoryId
			}
			this.AllCats.push(obj);
			this.AllCats = this.getBreadcrumb(this.AllCats)
			console.log(this.AllCats)

			localStorage.setItem('breadcrumb',JSON.stringify(this.AllCats));
      this.loadCategoryData(this.categoryId);
          }
  );

	}



	loadCategoryData(catId) {
		console.log("hhhhhhhhhhhh")
    this.spinner.show();
    let data ={
      "parent":catId,
    }
		  this.adminService.adminGetSubCategoryList(data).subscribe((result) => {
			this.result = result;
		},
		(err) => this.spinner.hide(),
		() => {
			if (this.result.status === 'success') {
				this.categoryData = this.result.data;
        this.totalRecords = this.result.data.length;


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
					this.loadCategoryData(this.categoryId);
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

	status_change(categoryId,currentStatus){
		this.confirmationService.confirm({
			message: 'Are you sure that you want to activate/deactivate this category?',
			header: 'Confirm Delete',
			icon: 'pi pi-exclamation-triangle',
			accept: () => {
				this.spinner.show();
				this.adminService.admin_change_category_status(categoryId,currentStatus).subscribe((result) => {
					this.result = result;
				},
				(err) => this.spinner.hide(),
				() => {
				if (this.result.status === 'success') {
					this.spinner.hide();
					this.loadCategoryData(this.categoryId);
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

	getBreadcrumb(data){
			let arr = [];
			for(let i of data){
				arr.push(i);
				if(i.id === this.categoryId){
					return arr;
				}
			}
	}
	back(){
		this._location.back();
	}
}
