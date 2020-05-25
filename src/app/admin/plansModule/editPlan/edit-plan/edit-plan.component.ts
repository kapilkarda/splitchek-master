import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, Data } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { AdminService } from '../../../../services/admin.service';

@Component({
  selector: 'app-edit-plan',
  templateUrl: './edit-plan.component.html',
  styleUrls: ['./edit-plan.component.css']
})
export class EditPlanComponent implements OnInit {
  model: any = {
    "kd": "",
    "kwd": "",
    "id": "",
  };
  result: any;
  categoryId: any;
  categorydata: any;

  constructor(
    private router: Router,
    private adminService: AdminService,
    private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private messageService: MessageService,
  ) { }

  ngOnInit() {
    if (localStorage.getItem('token') == null && localStorage.getItem('token') == 'null') {
      this.router.navigate(['/']);
    }
    this.activatedRoute.params
      .subscribe(
        (params: Params) => {
          this.categoryId = params['id'];
          this.model.id = this.categoryId;
        }
      );
    if (this.categoryId) {
      let data = {
        id: this.categoryId
      }
      this.spinner.show();
      this.adminService.admin_load_planData(data).subscribe(categorydata => {
        if (categorydata.status === 'success') {
          this.categorydata = categorydata.data;
          //this.selectedModuleList = roledata.data.modules;
          //this.selectedModuleList = roledata.data.modules;
          //this.selectedModuleList = roledata.data.modules.filter( (module) => module.checked );
          //console.log("selectedModuleList ",this.selectedModuleList);

          console.log("data",this.categorydata)
          this.model.kd = this.categorydata.kd;
          this.model.kwd = this.categorydata.kwd;        
          console.log("modellll ", this.model)
          this.spinner.hide();
        }
      });
    }
  }


  edit_plan() {
    this.spinner.show();
    this.adminService.admin_edit_planData(this.model).subscribe(result => {
      this.result = result;
      console.log(this.model,"update")
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
