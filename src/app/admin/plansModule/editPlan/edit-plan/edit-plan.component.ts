import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params, Data} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {MessageService} from 'primeng/api';
import {AdminService} from '../../../../services/admin.service';

@Component({
  selector: 'app-edit-plan',
  templateUrl: './edit-plan.component.html',
  styleUrls: ['./edit-plan.component.css']
})
export class EditPlanComponent implements OnInit {
  model: any = {description:'',
  id:'',
  amount:'',
  title:'',
  no_listing:'',
  no_day:''};
 result: any;
 categoryId:any;
 categorydata:any;

constructor(
  private router: Router,
  private adminService: AdminService,
  private activatedRoute: ActivatedRoute,
  private spinner: NgxSpinnerService,
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
  this.adminService.admin_load_planData(this.categoryId).subscribe(categorydata => {
        if (categorydata.status === 'success') {
           this.categorydata = categorydata.data;
           //this.selectedModuleList = roledata.data.modules;
           //this.selectedModuleList = roledata.data.modules;
           //this.selectedModuleList = roledata.data.modules.filter( (module) => module.checked );
           //console.log("selectedModuleList ",this.selectedModuleList);

           //console.log("ml",this.moduleList)
           this.model.title = this.categorydata.title;
           this.model.amount = this.categorydata.amount;
           this.model.description = this.categorydata.description;
           this.model.no_day = this.categorydata.no_day;
           this.model.no_listing = this.categorydata.no_listing;
           console.log("modellll ",this.model)
           this.spinner.hide();
        }
     });
  }
}


edit_plan() {
  this.spinner.show();
  this.adminService.admin_edit_planData(this.model).subscribe(result => {
    this.result = result;
  },
  (err) => console.log(err),
  () => {
    if (this.result.status === 'success') {
      this.spinner.hide();
      this.messageService.add({ severity: 'success', summary: 'Success', detail: this.result.message });
      this.router.navigate(['/admin/listPlan']);
    } else {
      this.spinner.hide();
      this.messageService.add({ severity: 'error', summary: 'Error', detail: this.result.message });
    }
  });
}
}
