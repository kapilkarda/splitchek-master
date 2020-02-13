import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params, Data } from '@angular/router';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { AdminService } from '../../../services/admin.service';

@Component({
   selector: 'adminaddpages',
   templateUrl: './adminaddpages.html',
   styleUrls: ['adminaddpages.css'],
})

export class adminaddpagesComponent {
   model: any = {};
   result: any;
   pageId: any;
   pagedata: any;

   constructor(
      private router: Router,
      private activatedRoute: ActivatedRoute,
      private adminService: AdminService,
      private spinner: NgxSpinnerService,
      private messageService: MessageService,
   ) {
   }

   ngOnInit() {
      this.pageId = this.activatedRoute.snapshot.queryParams['id'];
      if (this.pageId !== undefined) {
         this.adminService.admin_load_pageData(this.pageId).subscribe(pagedata => {
            if (pagedata.status === 'success') {
               this.pagedata = pagedata.data;
               this.model = this.pagedata;
            }
         });
      }
   }

   add_page() { 
      this.spinner.show();
      this.adminService.admin_add_page(this.model).subscribe(result => {
         this.result = result;
      },
      (err) => console.log(err),
      () => {
         if (this.result.status === 'success') {
            this.spinner.hide();
            this.messageService.add({ severity: 'success', summary: 'Success', detail: this.result.message });
            this.router.navigate(['/admin/managepages']);
         } else {
            this.spinner.hide();
            this.messageService.add({ severity: 'error', summary: 'Error', detail: this.result.message });
         }
      });
   }

   /*edit_page() {
      this.spinner.show();
      this.adminService.admin_edit_page(this.model).subscribe(result => {
         this.result = result;
      },
      (err) => console.log(err),
      () => {
         if (this.result.status === 'success') {
            this.spinner.hide();
            this.messageService.add({ severity: 'success', summary: 'Success', detail: this.result.message });
            this.router.navigate(['/admin/managepages']);
         } else {
            this.spinner.hide();
            this.messageService.add({ severity: 'error', summary: 'Error', detail: this.result.message });
         }
      });
   }*/
}


