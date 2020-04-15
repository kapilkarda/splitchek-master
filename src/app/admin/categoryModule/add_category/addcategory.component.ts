import {Component} from '@angular/core';
import {Router, ActivatedRoute, Params, Data} from '@angular/router';
import {NgForm} from '@angular/forms';
import {Location} from '@angular/common';
import {NgxSpinnerService} from 'ngx-spinner';
import {MessageService} from 'primeng/api';
import {AdminService} from '../../../services/admin.service';
import { TreeviewItem, TreeviewConfig } from 'ngx-treeview';
import {AppSettings} from '../../../../../appSettings';

@Component({
   selector: 'addcategory',
   templateUrl: './addcategory.html',
   styleUrls: ['addcategory.css'],
})

export class addcategoryComponent {
  model: any = {parent:'0',catname:'',form:'0',image:''};
   result: any;
   roleList:any;
   moduleArr: any = { "modules": [] };
   categories:any;
   items:any=[];
   upImage ='../../../../assets/img/dummy.png';

   uploadUrl = AppSettings.API_ENDPOINT;
	 pageTitle = 'Add New Category';
	 categoryId:any = '0';
	 catName:any = '0';
	constructor(
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private adminService: AdminService,
		private spinner: NgxSpinnerService,
		private messageService: MessageService,
		private _location: Location
	) { }

	ngOnInit() {

		this.activatedRoute.params
			.subscribe(
            (params: Params) => {
            this.categoryId = params['id'];
            this.catName = params['name'];
            }
		);
		if(this.categoryId != '0'){
			this.pageTitle = 'Add new sub category in: '+this.catName;
			
		}



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
 

	add_category() {
    this.model.form = this.model.form._id;    
		this.model.parent = this.categoryId;
		this.spinner.show();
		this.adminService.admin_add_category(this.model).subscribe(result => {
			this.result = result;
		},
		(err) => console.log(err),
		() => {
			if (this.result.status === 'success') {
				this.spinner.hide();
				this.messageService.add({ severity: 'success', summary: 'Success', detail: this.result.message });
				if(this.categoryId != '0'){
					this._location.back();
				}else{
					this.router.navigate(['/admin/managecategory']);
				}
			} else {
				this.spinner.hide();
				this.messageService.add({ severity: 'error', summary: 'Error', detail: this.result.message });
			}
		});
  }
  uploadProgress(){
    this.spinner.show();
   }
   onBasicUploadAuto(e){
    this.spinner.hide();
     console.log(e)
     let path = e.originalEvent.body.data[0].filename;
     this.model.image = path;
     this.upImage = path;
	 }
	 back(){
		this._location.back();
	}
}
