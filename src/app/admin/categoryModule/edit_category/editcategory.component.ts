import {Component} from '@angular/core';
import {Router, ActivatedRoute, Params, Data} from '@angular/router';
import {NgForm} from '@angular/forms';
import {NgxSpinnerService} from 'ngx-spinner';
import {MessageService} from 'primeng/api';
import {AdminService} from '../../../services/admin.service';
//import {UserService} from '../../../_services/user.service';

@Component({
   selector: 'editcategory',
   templateUrl: './editcategory.html',
   styleUrls: ['editcategory.css'],
})

export class editcategoryComponent {
	model: any = {parentId:'',catname:'',form:''};
	categoryId: any;
	categorydata: any;
	selectedModuleList:any;
  roleList:any;
  items:any;
    result: any;
    categories:any;
	/*moduleList:any;
	moduleArr: any = { "modules": [] }; */
    /*pagedata: any; */

	constructor(
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private adminService: AdminService,
		private spinner: NgxSpinnerService,
		private messageService: MessageService,
		//private userService: UserService,
	) { }

	ngOnInit() {
		this.activatedRoute.params
			.subscribe(
            (params: Params) => {
				this.categoryId = params['id'];
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
               this.model.parent = this.categorydata.parent;
               this.model.form = this.categorydata.form;
               console.log("modellll ",this.model)
               this.spinner.hide();
            }
         });
         this.items = [{"id":'1',value:'form1'},{"id":'2',value:'form2'}];
         this.loadCategoryData()
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

   /* loadModuleList(){
      this.roleService.adminGetModuleList().subscribe(module => {
         this.moduleList = module.data;
      },
      (err) => console.log(err),
      () => {
         console.log("this.moduleList ",this.moduleList[0])
      });
   } */
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
     edit_category() {
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
            this.router.navigate(['/admin/managecategory']);
         } else {
            this.spinner.hide();
            this.messageService.add({ severity: 'error', summary: 'Error', detail: this.result.message });
         }
      });
   }



    /* onChangeModule(event, module: any){
      console.log("event ",event)
      console.log("module ",module)
      this.moduleArr.modules.push(module);
   } */
}
