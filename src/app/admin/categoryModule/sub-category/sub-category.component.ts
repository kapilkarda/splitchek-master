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
    this.router.routeReuseStrategy.shouldReuseRoute = function(){
      return false;
   }
	}
	ngOnInit() {
		this.activatedRoute.params
    .subscribe(
          (params: Params) => {
			this.categoryId = params['id'];
      this.catName = params['name'];
      // this.router.navigateByUrl('/admin/dashboard/', { skipLocationChange: true }).then(() => {
      //   this.router.navigate(['admin/subcategory',this.categoryId,this.catName]);
      // });
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
			this.loadCategoryData();
      // this.loadCategoryData(this.categoryId);
					}
	);

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

	getCatDataMain(data){
		console.log(data)
		for(let item of data ){
			if(item._id == this.categoryId){
				return item.subCat;
			}
			if(item.subCat){
				let d = this.getCatDataMain2(item.subCat);
				return d;
			}
		}
	}

	getCatDataMain2(data){
		for(let item of data ){
			if(item._id == this.categoryId){
				return item.subCat;
			}
			if(item.subCat){
				let d = this.getCatDataMain2(item.subCat);
				return d;
			}
		}
	}


	viewSubCat(id,name){
		// localStorage.setItem('subCatData',JSON.stringify(data))
		this.router.navigateByUrl('/admin/dashboard/', { skipLocationChange: true }).then(() => {
			this.router.navigate(['admin/subcategory',id,name]);
		});
		// this.router.navigate(['admin/subcategory',id,name])

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
        let catDAta =  this.result.data;
        console.log(catDAta);

      let mainData = this.getCatDataMain(catDAta)
        for(let item of mainData){
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

        this.categoryData = mainData;
        console.log(this.categoryData)
        this.totalRecords = this.categoryData.length;
				this.spinner.hide();
			} else {
				this.spinner.hide();
				this.messageService.add({severity:'error', summary: 'Success', detail:this.result.message});
			}
		});
	}
}
