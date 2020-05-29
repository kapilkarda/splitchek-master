import {Component} from '@angular/core';
import {Router, ActivatedRoute, Params, Data} from '@angular/router';
import {NgForm} from '@angular/forms';
import {NgxSpinnerService} from 'ngx-spinner';
import {MessageService} from 'primeng/api';
import {AdminService} from '../../../services/admin.service';
//import {UserService} from '../../../_services/user.service';

@Component({
   selector: 'addstaff',
   templateUrl: './addstaff.html',
   styleUrls: ['addstaff.css'],
})

export class addstaffComponent {
   model: any = {};
   result: any;
   roleList:any;
   moduleArr: any = { "modules": [] };
   categories = {};
   /* pageId: any;
   pagedata: any; */

   constructor(
      private router: Router,
      private activatedRoute: ActivatedRoute,
      private adminService: AdminService,
      //private userService: UserService,
      private spinner: NgxSpinnerService,
      private messageService: MessageService,
   ) {
   }

   ngOnInit() {
      /* this.pageId = this.activatedRoute.snapshot.queryParams['id'];
      if (this.pageId !== undefined) {
         this.spinner.show();
         this.adminService.admin_load_pageData(this.pageId).subscribe(pagedata => {
            if (pagedata.status === 'success') {
               this.pagedata = pagedata.data;
               this.model = this.pagedata;
               this.spinner.hide();
            }
         });
      } */
      /* this.roleService.adminGetModuleList().subscribe(result => {
         this.result = result;
      }, */

      this.adminService.adminGetRolesList().subscribe(role => {
         this.roleList = role.data;
         console.log("this.roleList ",this.roleList)
      },
      (err) => console.log(err),
      () => { 
         console.log("this.moduleList ",this.roleList[0])
      }); 

   }

   add_staff() { 
      //console.log("catttttttttttttt ",this.categories)
      //this.model.modules = this.moduleArr.modules; 
      //this.model.modules = this.categories;
      console.log("model",this.model)
      this.spinner.show();
      
       this.adminService.admin_add_staff(this.model).subscribe(result => {
         this.result = result;
      },
      (err) => console.log(err),
      () => {
         if (this.result.status === 'success') {
            this.spinner.hide();
            this.messageService.add({ severity: 'success', summary: 'Success', detail: this.result.message });
            this.router.navigate(['/admin/managestaff']);
         } else {
            this.spinner.hide();
            this.messageService.add({ severity: 'error', summary: 'Error', detail: this.result.message });
         }
      });  
   }  

   /* onChangeModule(event, moduleId: any,moduleName: any){  
      console.log("event ",event)
      console.log("moduleId ",moduleId)
      console.log("moduleName ",moduleName)
      let module={"moduleId":moduleId,"moduleName":moduleName}
      this.moduleArr.modules.push(module);
      //const selectedCountries = this.countries.filter( (country) => country.checked );
      //console.log("selectedCountries ",selectedCountries)
   } */
}