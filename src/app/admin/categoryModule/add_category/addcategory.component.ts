import {Component} from '@angular/core';
import {Router, ActivatedRoute, Params, Data} from '@angular/router';
import {NgForm} from '@angular/forms';
import {NgxSpinnerService} from 'ngx-spinner';
import {MessageService} from 'primeng/api';
import {AdminService} from '../../../services/admin.service';
import { TreeviewItem, TreeviewConfig } from 'ngx-treeview';

@Component({
   selector: 'addcategory',
   templateUrl: './addcategory.html',
   styleUrls: ['addcategory.css'],
})

export class addcategoryComponent {
  model: any = {parent:'0',catname:'',form:''};
   result: any;
   roleList:any;
   moduleArr: any = { "modules": [] };
   categories:any;
   items:any=[];



	constructor(
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private adminService: AdminService,
		private spinner: NgxSpinnerService,
		private messageService: MessageService,
	) { }

	ngOnInit() {

  this.loadCategoryData();
  this.loadFormData();
  }
  loadFormData() {
		console.log("hhhhhhhhhhhh")
    this.spinner.show();
		  this.adminService.getFormList().subscribe((result) => {
			this.result = result;
		},
		(err) => this.spinner.hide(),
		() => {
			if (this.result.status === 'success') {
        this.items = this.result.data;
        let objectName = {
          form_name:'Select Form',
          _id:'0'
        }
        this.items.splice(0, 0, objectName)
        console.log(this.items)
				this.spinner.hide();
			} else {
				this.spinner.hide();
				this.messageService.add({severity:'error', summary: 'Success', detail:this.result.message});
			}
		});
	}
  loadCategoryData() {
		console.log("hhhhhhhhhhhh")
		this.spinner.show();
		  this.adminService.adminGetCategoryList().subscribe((result) => {
			this.result = result;
		},
		(err) => this.spinner.hide(),
		() => {
			if (this.result.status === 'success') {
        this.categories = this.result.data;
        let objectName = {
          catname:'Select Category',
          _id:'0'
        }
        this.categories.splice(0, 0, objectName)

        // console.log(this.catList)
				this.spinner.hide();
			} else {
				this.spinner.hide();
				this.messageService.add({severity:'error', summary: 'Success', detail:this.result.message});
			}
		});
	}

	add_category() {
    this.model.form = this.model.form._id;
    this.model.parent = this.model.parent._id
		this.spinner.show();
		this.adminService.admin_add_category(this.model).subscribe(result => {
			this.result = result;
		},
		(err) => console.log(err),
		() => {
			if (this.result.status === 'success') {
				this.spinner.hide();
				this.messageService.add({ severity: 'success', summary: 'Success', detail: this.result.message });
				this.router.navigate(['/admin/managecategory']);
			} else {
				this.spinner.hide();
				this.messageService.add({ severity: 'error', summary: 'Error', detail: this.result.message });
			}
		});
	}
}
