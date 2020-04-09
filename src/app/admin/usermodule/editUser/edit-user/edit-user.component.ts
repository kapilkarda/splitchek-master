import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params, Data} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {MessageService} from 'primeng/api';
import {AdminService} from '../../../../services/admin.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  model: any = {
    "id":"",
    "name":"",
    "email":"",
    "phoneNumber":"",
    "password":""
  };
 result: any;
 categoryId:any;
 categorydata:any;

constructor(
  private router: Router,
  private adminService: AdminService,
  private spinner: NgxSpinnerService,
  private activatedRoute: ActivatedRoute,
  private messageService: MessageService,
) { }

ngOnInit() {
  this.activatedRoute.params
  .subscribe(
        (params: Params) => {
    this.categoryId = params['id'];
    this.model.id = this.categoryId;
        }
);
    if (this.categoryId) {
  this.spinner.show();
  this.adminService.admin_load_userData(this.categoryId).subscribe(categorydata => {
        if (categorydata.status === 'success') {
           this.categorydata = categorydata.data;
           //this.selectedModuleList = roledata.data.modules;
           //this.selectedModuleList = roledata.data.modules;
           //this.selectedModuleList = roledata.data.modules.filter( (module) => module.checked );
           //console.log("selectedModuleList ",this.selectedModuleList);

           //console.log("ml",this.moduleList)
           this.model.name = this.categorydata.name;
           this.model.email = this.categorydata.email;
           this.model.phonenumber = this.categorydata.phonenumber;
           this.model.password = this.categorydata.password;
           console.log("modellll ",this.model)
           this.spinner.hide();
        }
     });
  }
}


add_user() {
  this.spinner.show();
  this.adminService.admin_edit_user(this.model).subscribe(result => {
    this.result = result;
  },
  (err) => console.log(err),
  () => {
    if (this.result.status === 'success') {
      this.spinner.hide();
      this.messageService.add({ severity: 'success', summary: 'Success', detail: this.result.message });
      this.router.navigate(['/admin/listUser']);
    } else {
      this.spinner.hide();
      this.messageService.add({ severity: 'error', summary: 'Error', detail: this.result.message });
    }
  });
}
}
