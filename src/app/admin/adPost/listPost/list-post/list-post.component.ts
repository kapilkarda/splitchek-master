import {Component,OnInit} from '@angular/core';
import {Router,ActivatedRoute,Params,Data} from '@angular/router';
import {NgForm} from '@angular/forms';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {NgxSpinnerService} from 'ngx-spinner';
import {MessageService} from 'primeng/api';
import {ConfirmationService} from 'primeng/api';
//import {AdminService} from '../../../services/admin.service';
import {AdminService} from '../../../../services/admin.service';
//import {UserService} from '../../../_services/user.service';
//import { Subject } from 'rxjs';


@Component({
  selector: 'app-list-post',
  templateUrl: './list-post.component.html',
  styleUrls: ['./list-post.component.css']
})
export class ListPostComponent implements OnInit {
	model: any = {};
	result: any;
	postData: any;
  totalRecords: number;
  display: boolean = false;
  fieldData:any;
  fieldTitle:any;

  Customer:any ;
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
    this.loadUserData();
    this.loadpostData();
	}
  loadUserData() {
    console.log("hhhhhhhhhhhh")
    this.spinner.show();
      this.adminService.getUserList().subscribe((result) => {
      this.result = result;
    },
    (err) => this.spinner.hide(),
    () => {
      if (this.result.status === 'success') {

        this.Customer = this.result.data;
        console.log(this.Customer)
        this.spinner.hide();
      } else {
        this.spinner.hide();
        this.messageService.add({severity:'error', summary: 'Success', detail:this.result.message});
      }
    });
  }


	loadpostData() {
		console.log("hhhhhhhhhhhh")
    this.spinner.show();
		  this.adminService.adminGetPostList().subscribe((result) => {
			this.result = result;
		},
		(err) => this.spinner.hide(),
		() => {
			if (this.result.status === 'success') {

        this.postData = this.result.data;
        console.log(this.postData)
        this.totalRecords = this.result.data.length;

				this.spinner.hide();
			} else {
				this.spinner.hide();
				this.messageService.add({severity:'error', summary: 'Success', detail:this.result.message});
			}
		});
	}

	delete_category(id,isdeleted){
    let data = {
      "id":id,
    }
		this.confirmationService.confirm({
			message: 'Are you sure that you want to delete this post?',
			header: 'Confirm Delete',
			icon: 'pi pi-exclamation-triangle',
			accept: () => {
				this.spinner.show();
				this.adminService.admin_delete_post(data).subscribe((result) => {
					this.result = result;
				},
				(err) => this.spinner.hide(),
				() => {
				if (this.result.status === 'success') {
					this.spinner.hide();
					this.loadpostData();
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
  show(data) {

    this.display = true;
    this.fieldData = data.field;
    this.fieldTitle = data.form_name
  }
	// status_change(categoryId,currentStatus){
	// 	this.confirmationService.confirm({
	// 		message: 'Are you sure that you want to activate/deactivate this post?',
	// 		header: 'Confirm Delete',
	// 		icon: 'pi pi-exclamation-triangle',
	// 		accept: () => {
	// 			this.spinner.show();
	// 			this.adminService.admin_change_category_status(categoryId,currentStatus).subscribe((result) => {
	// 				this.result = result;
	// 			},
	// 			(err) => this.spinner.hide(),
	// 			() => {
	// 			if (this.result.status === 'success') {
	// 				this.spinner.hide();
	// 				this.loadpostData();
	// 				this.messageService.add({severity:'success', summary: 'Success', detail:this.result.message});
	// 			} else {
	// 				this.spinner.hide();
	// 				this.messageService.add({severity:'error', summary: 'Success', detail:this.result.message});
	// 			}
	// 		});
	// 	},
	// 		reject: () => {
	// 		}
	//   });
  // }

  getUser(id){
    for(let k of this.Customer){
      if(k._id == id){
        console.log(k)
        return k.name
      }
    }
  }

}
