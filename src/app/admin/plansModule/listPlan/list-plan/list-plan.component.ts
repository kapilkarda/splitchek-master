import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router,ActivatedRoute,Params,Data} from '@angular/router';
import {NgForm} from '@angular/forms';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {NgxSpinnerService} from 'ngx-spinner';
import {MessageService} from 'primeng/api';
import {ConfirmationService} from 'primeng/api';
import {AdminService} from '../../../../services/admin.service';

@Component({
  selector: 'app-list-plan',
  templateUrl: './list-plan.component.html',
  styleUrls: ['./list-plan.component.css']
})
export class ListPlanComponent implements OnInit {
  model: any = {};
	result: any;
	planlistData: any;
  totalRecords: number;
  display: boolean = false;
  fieldData:any;
  fieldTitle:any;
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
	}

  show(data) {

    this.display = true;
    this.fieldData = data.description;
    this.fieldTitle = data.title
  }

  ngOnDestroy() {

  }

	loadFormData() {
		console.log("hhhhhhhhhhhh")
    this.spinner.show();
		  this.adminService.getPlanList().subscribe((result) => {
			this.result = result;
		},
		(err) => this.spinner.hide(),
		() => {
			if (this.result.status === 'success') {
				this.planlistData = this.result.data;
        this.totalRecords = this.result.data.length;
        console.log(this.planlistData)
				this.spinner.hide();
			} else {
				this.spinner.hide();
				this.messageService.add({severity:'error', summary: 'Success', detail:this.result.message});
			}
		});
	}

	delete_form(id,isDeleted){
		this.confirmationService.confirm({
			message: 'Are you sure that you want to delete this Plan?',
			header: 'Confirm Delete',
			icon: 'pi pi-exclamation-triangle',
			accept: () => {
        let data = {
          "id":id
        }
				this.spinner.show();
				this.adminService.admin_delete_plan(data).subscribe((result) => {
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
			message: 'Are you sure that you want to activate/deactivate this Plan?',
			header: 'Confirm Delete',
			icon: 'pi pi-exclamation-triangle',
			accept: () => {
        this.spinner.show();
        let data = {
          "id":id,
	        "status":status

        }
				this.adminService.admin_update_plan(data).subscribe((result) => {
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

}
