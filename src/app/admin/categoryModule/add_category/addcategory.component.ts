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
   model: any = {};
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

    this.items = [{"id":'1',value:'form1'},{"id":'2',value:'form2'}];
  this.loadCategoryData();
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
				this.spinner.hide();
			} else {
				this.spinner.hide();
				this.messageService.add({severity:'error', summary: 'Success', detail:this.result.message});
			}
		});
	}

	add_category() {
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
