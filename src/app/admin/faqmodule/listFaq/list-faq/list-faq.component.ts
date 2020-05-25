import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router,ActivatedRoute,Params,Data} from '@angular/router';
import {NgForm} from '@angular/forms';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {NgxSpinnerService} from 'ngx-spinner';
import {MessageService} from 'primeng/api';
import {ConfirmationService} from 'primeng/api';
import {AdminService} from '../../../../services/admin.service';

@Component({
  selector: 'app-list-faq',
  templateUrl: './list-faq.component.html',
  styleUrls: ['./list-faq.component.css']
})
export class ListFaqComponent implements OnInit {
  model: any = {};
	result: any;
	FaqlistData: any;
  totalRecords: number;
  display: boolean = false;
  fieldData:any;
  fieldTitle:any;
  category:any;
  faqData = {"id":""}
  catId:any;
	//private unsubscribe$: Subject<any> = new Subject<any>();
	constructor(
		//private cdref: ChangeDetectorRef,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private adminService: AdminService,
		//private userService: UserService,
		private spinner: NgxSpinnerService,
		private messageService: MessageService,
		private confirmationService: ConfirmationService
	) {

	}
	ngOnInit() {
    if(localStorage.getItem('token') == null && localStorage.getItem('token') =='null'){
      this.router.navigate(['/']);
    }
		this.loadFormData();
    this.loadCategoryData();
  }
  loadCategoryData() {
      console.log("hhhhhhhhhhhh")
      this.spinner.show();
        this.adminService.adminGetCategoryList().subscribe((result) => {
        this.result = result;
        console.log(this.result.data)
      },
      (err) => this.spinner.hide(),
      () => {
        if (this.result.status === 'success') {
          this.category = this.result.data;

          this.spinner.hide();
        } else {
          this.spinner.hide();
          this.messageService.add({severity:'error', summary: 'Success', detail:this.result.message});
        }
      });
    }


  show(data) {

    this.display = true;
    this.fieldData = data.answer;
    this.fieldTitle = data.question
  }

  ngOnDestroy() {

  }
  getCatData(e){
    this.faqData.id = e._id;
    this.loadFormData()
  }
	loadFormData() {
		console.log("hhhhhhhhhhhh")
    this.spinner.show();
		  this.adminService.getFaqList(this.faqData).subscribe((result) => {
			this.result = result;
		},
		(err) => this.spinner.hide(),
		() => {
			if (this.result.status === 'success') {
				this.FaqlistData = this.result.datas;
        this.totalRecords = this.result.datas.length;
        console.log(this.FaqlistData)
				this.spinner.hide();
			} else {
				this.spinner.hide();
				this.messageService.add({severity:'error', summary: 'Success', detail:this.result.message});
			}
		});
	}

	delete_form(id,isDeleted){
		this.confirmationService.confirm({
			message: 'Are you sure that you want to delete this Faq?',
			header: 'Confirm Delete',
			icon: 'pi pi-exclamation-triangle',
			accept: () => {
        let data = {
          "id":id
        }
				this.spinner.show();
				this.adminService.admin_delete_Faq(data).subscribe((result) => {
					this.result = result;
				},
				(err) => this.spinner.hide(),
				() => {
				if (this.result.status === 'success') {
					this.spinner.hide();
					this.loadFormData();
					this.messageService.add({severity:'success', summary: 'Success', detail:this.result.message});
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

	status_change(id,status){
		this.confirmationService.confirm({
			message: 'Are you sure that you want to activate/deactivate this Faq?',
			header: 'Confirm Delete',
			icon: 'pi pi-exclamation-triangle',
			accept: () => {
        this.spinner.show();
        let data = {
          "id":id,
	        "status":status

        }
				this.adminService.admin_update_Faq(data).subscribe((result) => {
					this.result = result;
				},
				(err) => this.spinner.hide(),
				() => {
				if (this.result.status === 'success') {
					this.spinner.hide();
					this.loadFormData();
					this.messageService.add({severity:'success', summary: 'Success', detail:this.result.message});
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
 language(data){
	//  console.log(data)
	 if(data.languageType =='en'){
		 return 'English'
	 }else if(data.languageType=='ar'){
		 return 'Arabic'
	 }
 }
}
