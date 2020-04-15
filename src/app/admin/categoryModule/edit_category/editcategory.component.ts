import {Component} from '@angular/core';
import {Location} from '@angular/common';
import {Router, ActivatedRoute, Params, Data} from '@angular/router';
import {NgForm} from '@angular/forms';
import {NgxSpinnerService} from 'ngx-spinner';
import {MessageService} from 'primeng/api';
import {AdminService} from '../../../services/admin.service';
//import {UserService} from '../../../_services/user.service';
import {AppSettings} from '../../../../../appSettings';

@Component({
   selector: 'editcategory',
   templateUrl: './editcategory.html',
   styleUrls: ['editcategory.css'],
})

export class editcategoryComponent {
	model: any = {id:'',parent:'0',catname:'',form:'',image:''};
	categoryId: any;
	categorydata: any;
	selectedModuleList:any;
  roleList:any;
  items:any;
  catName:any;
    result: any;
    categories:any;
    pageTitle = 'Add Category';
    upImage ='../../../../assets/img/dummy.png';
   parentId:any ='0';
   parentName:any='0';
   uploadUrl = AppSettings.API_ENDPOINT;

	/*moduleList:any;
	moduleArr: any = { "modules": [] }; */
    /*pagedata: any; */

	constructor(
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private adminService: AdminService,
		private spinner: NgxSpinnerService,
		private messageService: MessageService,
		private _location: Location
		//private userService: UserService,
	) { }

	ngOnInit() {
		this.activatedRoute.params
			.subscribe(
            (params: Params) => {
            this.categoryId = params['id'];
            this.catName = params['name'];
            this.model.id = this.categoryId;
            this.parentId = params['pid'];
            this.parentName = params['pname'];
            }
		);
        if (this.categoryId) {
			this.spinner.show();
			this.adminService.admin_load_categoryData(this.categoryId).subscribe(categorydata => {
            if (categorydata.status === 'success') {
               this.categorydata = categorydata.data;
               //this.selectedModuleList = roledata.data.modules;
               //this.selectedModuleList = roledata.data.modules;
               //this.selectedModuleList = roledata.data.modules.filter( (module) => module.checked );
               //console.log("selectedModuleList ",this.selectedModuleList);

               //console.log("ml",this.moduleList)
               this.model.catname = this.categorydata.catname;
               this.model.image = this.categorydata.image;
               if(this.categorydata.image && this.categorydata.image != ''){
                this.upImage = this.categorydata.image;
               }

               console.log("modellll ",this.model)
               this.spinner.hide();
            }
         });
         this.loadFormData();
      }

      /*this.adminService.adminGetRolesList().subscribe(role => {
         this.roleList = role.data;
         console.log("this.roleList ",this.roleList)
      },
      (err) => console.log(err),
      () => {
         console.log("this.moduleList ",this.roleList[0])
      }); */



      /* this.roleService.adminGetModuleList().subscribe(result => {
         this.result = result;
      }, */

      /* this.roleService.adminGetModuleList().subscribe(module => {
         this.moduleList = module.data;
      },
      (err) => console.log(err),
      () => {
         console.log("this.moduleList ",this.moduleList[0])
      });  */
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
				this.spinner.hide();
        console.log(this.items)
        for(let item of this.items){
          if(item._id == this.categorydata.form){          
            
            this.model.form = item;
          }
        }
				this.spinner.hide();
			} else {
				this.spinner.hide();
				this.messageService.add({severity:'error', summary: 'Success', detail:this.result.message});
			}
		});
	}

   /* loadModuleList(){
      this.roleService.adminGetModuleList().subscribe(module => {
         this.moduleList = module.data;
      },
      (err) => console.log(err),
      () => {
         console.log("this.moduleList ",this.moduleList[0])
      });
   } */
   
     edit_category() {
       this.model.form = this.model.form._id;
       this.model.parent = this.parentId;
      //this.model.modules = this.moduleArr.modules;
      console.log("model ",this.model)
      this.spinner.show();

      this.adminService.admin_edit_category(this.model).subscribe(result => {
         this.result = result;
      },
      (err) => console.log(err),
      () => {
         if (this.result.status === 'success') {
            this.spinner.hide();
            this.messageService.add({ severity: 'success', summary: 'Success', detail: this.result.message });
            this._location.back();
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
