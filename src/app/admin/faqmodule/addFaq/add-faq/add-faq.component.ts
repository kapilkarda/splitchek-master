import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params, Data} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {MessageService} from 'primeng/api';
import {AdminService} from '../../../../services/admin.service';

@Component({
  selector: 'app-add-faq',
  templateUrl: './add-faq.component.html',
  styleUrls: ['./add-faq.component.css']
})
export class AddFaqComponent implements OnInit {
  model: any = {
    "question":"",
    "answer":"",
    "catId":''

  };
 result: any;
category:any;


constructor(
  private router: Router,
  private adminService: AdminService,
  private spinner: NgxSpinnerService,
  private messageService: MessageService,
) { }

ngOnInit() {
  if(localStorage.getItem('token') == null && localStorage.getItem('token') =='null'){
    this.router.navigate(['/']);
  }
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


add_faq() {
  this.spinner.show();
  this.model.catId = this.model.catId._id;
  this.adminService.admin_add_faq(this.model).subscribe(result => {
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
