import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params, Data } from '@angular/router';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { AdminService } from '../../../services/admin.service';
//import { NotificationsService } from '../../services/notifications.service';

@Component({
   selector: 'adminaddtraits',
   templateUrl: './adminaddtraits.html',
   styleUrls: ['adminaddtraits.css'],
})

export class adminaddtraitsComponent {
   model: any = {};
   result: any;
   traitId: any;
   traitdata: any;

   constructor(
      private router: Router,
      private activatedRoute: ActivatedRoute,
      private adminService: AdminService,
      private spinner: NgxSpinnerService,
      private messageService: MessageService,
      //private notificationsService: NotificationsService
   ) {
      //this.spinner.hide();
   }

   ngOnInit() {
      this.traitId = this.activatedRoute.snapshot.queryParams['id'];

      if (this.traitId !== undefined) {
         this.adminService.admin_load_traitData(this.traitId).subscribe(traitdata => {
            if (traitdata.status === 'success') {
               this.traitdata = traitdata.data;
               this.model = this.traitdata;
            }
         });
      }
   }

   add_traits() {
      this.spinner.show();
      this.adminService.admin_add_traits(this.model).subscribe(result => {
         this.result = result;
      },
      (err) => console.log(err),
      () => {
         if (this.result.status === 'success') {
            this.spinner.hide();
            this.messageService.add({ severity: 'success', summary: 'Success', detail: this.result.message });
            this.router.navigate(['/admin/managetraits']);
         } else {
            this.spinner.hide();
            this.messageService.add({ severity: 'error', summary: 'Error', detail: this.result.message });
            //this.notificationsService.notify('error', 'Failure', this.result.message);
         }
      });
   }

   edit_traits() {
      this.spinner.show();
      this.adminService.admin_edit_traits(this.model).subscribe(result => {
         this.result = result;
      },
         (err) => console.log(err),
         () => {
            if (this.result.status === 'success') {
               this.spinner.hide();
               this.messageService.add({ severity: 'success', summary: 'Success', detail: this.result.message });
               this.router.navigate(['/admin/managetraits']);
            } else {
               this.spinner.hide();
               this.messageService.add({ severity: 'error', summary: 'Error', detail: this.result.message });
               //this.notificationsService.notify('error', 'Failure', this.result.message);
            }
         });
   }
}


