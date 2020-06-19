import {Component} from '@angular/core';
import {Router, ActivatedRoute, Params, Data} from '@angular/router';
import {NgForm} from '@angular/forms';
import {NgxSpinnerService} from 'ngx-spinner';
import {MessageService} from 'primeng/api';
import {AdminService} from '../../../services/admin.service';
//import {UserService} from '../../../_services/user.service';

@Component({
   selector: 'editstaff',
   templateUrl: './editstaff.html',
   styleUrls: ['editstaff.css'],
})

export class editstaffComponent {
   model: any = {};
   staffId: any;
   staffdata: any;
   selectedModuleList:any;
   roleList:any;
    result: any;
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
   ) {
   }

   ngOnInit() {

      this.activatedRoute.params
         .subscribe(
            (params: Params) => {
               this.staffId = params['id'];
            }
      );
         //this.loadModuleList();

      if (this.staffId !== undefined) {
         this.spinner.show();
         this.adminService.admin_load_staffData(this.staffId).subscribe(staffdata => {
            if (staffdata.status === 'success') {
               this.staffdata = staffdata.data;
               //this.selectedModuleList = roledata.data.modules;
               //this.selectedModuleList = roledata.data.modules;
               //this.selectedModuleList = roledata.data.modules.filter( (module) => module.checked );
               //console.log("selectedModuleList ",this.selectedModuleList);

               //console.log("ml",this.moduleList)
               this.model = this.staffdata;
               console.log("modellll ",this.model)
               this.spinner.hide();
            }
         });
      }

      this.adminService.adminGetRolesList().subscribe(role => {
         this.roleList = role.data;
         console.log("this.roleList ",this.roleList)
      },
      (err) => console.log(err),
      () => {
         console.log("this.moduleList ",this.roleList[0])
      });



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

     edit_staff() {
      //this.model.modules = this.moduleArr.modules;
      this.model.email = this.model.email.toLowerCase();
      console.log("model ",this.model)
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



    /* onChangeModule(event, module: any){
      console.log("event ",event)
      console.log("module ",module)
      this.moduleArr.modules.push(module);
   } */
}
