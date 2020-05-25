import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, Data } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { AdminService } from '../../../../services/admin.service';

@Component({
  selector: 'app-edit-faq',
  templateUrl: './edit-faq.component.html',
  styleUrls: ['./edit-faq.component.css']
})
export class EditFaqComponent implements OnInit {
  model: any = {
    "question": "",
    "answer": "",
    "languageType": "",
    "id": "",
    "catId": ""
  };
  result: any;
  categoryId: any;
  categorydata: any;
  catName: any;
  language: any = [
    { label: 'choose language', value: '' },
    { label: 'English', value: 'en' },
    { label: 'Arabic', value: 'ar' }
  ];
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
      this.spinner.show();
      this.adminService.admin_load_faqData(this.categoryId).subscribe(categorydata => {
        if (categorydata.status === 'success') {
          this.categorydata = categorydata.datas[0
          ];

          //this.selectedModuleList = roledata.data.modules;
          //this.selectedModuleList = roledata.data.modules;
          //this.selectedModuleList = roledata.data.modules.filter( (module) => module.checked );
          //console.log("selectedModuleList ",this.selectedModuleList);

          console.log("ml", this.categorydata)
          this.model.question = this.categorydata.question;
          this.model.answer = this.categorydata.answer;
          this.model.catId = this.categorydata.catId;
          this.catName = this.categorydata.catName;
          if (this.categorydata.languageType == 'en') {
            return (
            this.model.languageType =  { label: 'English', value: 'en' },
            this.spinner.hide())
          } else if (this.categorydata.languageType == 'ar') {
            return (
            this.model.languageType = { label: 'Arabic', value: 'ar' },
            this.spinner.hide())
          }
          
          console.log("modellll ", this.model)
          this.spinner.hide();
        }
      });      
    }
  }


  edit_faq() {
    this.model.languageType = this.model.languageType.value
    this.spinner.show();
    this.adminService.admin_edit_faqData(this.model).subscribe(result => {
      this.result = result;
    },
      (err) => console.log(err),
      () => {
        if (this.result.status === 'success') {
          this.spinner.hide();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: this.result.message });
          this.router.navigate(['/admin/listFaq']);
        } else {
          this.spinner.hide();
          this.messageService.add({ severity: 'error', summary: 'Error', detail: this.result.message });
        }
      });
  }
}
