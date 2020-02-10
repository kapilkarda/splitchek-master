import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute, Params, Data } from '@angular/router';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { AdminService } from '../../../services/admin.service';
import { AppSettings } from '../../../../../appSettings';

@Component({
   selector: 'adminadddeals',
   templateUrl: './adminadddeals.html',
   styleUrls: ['adminadddeals.css'],
})

export class adminadddealsComponent {
   model: any = {};
   result: any;
   dealId: any;
   dealdata: any;
   dealImages:any;
   imagePath:any;
   filesToUpload: Array<File>;
   minimumDate = new Date();

   constructor(
      private router: Router,
      private activatedRoute: ActivatedRoute,
      private adminService: AdminService,
      private spinner: NgxSpinnerService,
      private messageService: MessageService,
      private confirmationService: ConfirmationService,
      private datePipe: DatePipe
   ) {
   }

   ngOnInit() {
      this.loadDeals();
   }

   loadDeals(){
      this.dealId = this.activatedRoute.snapshot.queryParams['id'];
      if (this.dealId !== undefined) {
         this.adminService.admin_load_dealData(this.dealId).subscribe(dealdata => {
            if (dealdata.status === 'success') {
               this.dealdata = dealdata.data;
               this.dealdata.expireOn = this.datePipe.transform(this.dealdata.expireOn, 'yyyy-MM-dd');
               this.model = this.dealdata;
               this.dealImages = this.dealdata.dealImages;
               this.imagePath = AppSettings.API_ENDPOINT+'/images/admin/dealsPics/';
            }
         });
      }
   }
   handleFileInput(fileInput: any) {
      this.filesToUpload = <Array<File>> fileInput.target.files;
   }

   add_deal() {
      this.spinner.show();
      this.adminService.admin_add_deal(this.model,this.filesToUpload).then(result => {
         this.result = result;
         if (this.result.status === 'success') {
            this.spinner.hide();
            this.messageService.add({ severity: 'success', summary: 'Success', detail: this.result.message });
            this.router.navigate(['/admin/managedeals']);
         } else {
            this.spinner.hide();
            this.messageService.add({ severity: 'error', summary: 'Error', detail: this.result.message });
         }
      });
   }

   edit_deal() {
      this.spinner.show();
      this.adminService.admin_edit_page(this.model).subscribe(result => {
         this.result = result;
      },
      (err) => console.log(err),
      () => {
         if (this.result.status === 'success') {
            this.spinner.hide();
            this.messageService.add({ severity: 'success', summary: 'Success', detail: this.result.message });
            this.router.navigate(['/admin/managedeals']);
         } else {
            this.spinner.hide();
            this.messageService.add({ severity: 'error', summary: 'Error', detail: this.result.message });
         }
      });
   }

   deleteDealImages(dealId,imageName){
      this.confirmationService.confirm({
			message: 'Are you sure that you want to proceed?',
			header: 'Confirm Delete',
			icon: 'pi pi-exclamation-triangle',
			accept: () => {
				this.spinner.show();
				this.adminService.admin_delete_deal_image(dealId,imageName).subscribe((result) => {
					this.result = result;
				},
				(err) => this.spinner.hide(),
				() => {
				   if (this.result.status === 'success') {
					   this.spinner.hide();
					   this.messageService.add({severity:'success', summary: 'Success', detail:this.result.message});
                  //this.router.navigate(['/admin/managedeals']);
                  this.loadDeals();
				   } else {
					   this.spinner.hide();
					   this.messageService.add({severity:'error', summary: 'Success', detail:this.result.message});
				   }
			   });
		   },
			reject: () => {
				 
			}
	   });
   }
}


