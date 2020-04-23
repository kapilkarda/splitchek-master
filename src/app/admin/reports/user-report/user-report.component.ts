import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params, Data} from '@angular/router';
import {NgForm} from '@angular/forms';
import {NgxSpinnerService} from 'ngx-spinner';
import {MessageService} from 'primeng/api';
import {AdminService} from '../../../services/admin.service';
import * as moment from 'moment';

@Component({
  selector: 'app-user-report',
  templateUrl: './user-report.component.html',
  styleUrls: ['./user-report.component.css']
})
export class UserReportComponent implements OnInit {
  model: any = {
    "start":"2020-01-09",
	  "end":"2020-12-10"

  };
  date1:Date;
  date2:Date;
  result: any;
  user:any;
  reportData:any=[];
  totalRecords:any=0;
 constructor(
   private router: Router,
   private activatedRoute: ActivatedRoute,
   private adminService: AdminService,
   private spinner: NgxSpinnerService,
   private messageService: MessageService){

   }

  ngOnInit() {
    this.report()
  }
  report() {
    if(this.date1 && this.date2){

      this.model.start = this.date1;
      this.model.end = this.date2;
    }
    console.log(this.model)
    this.spinner.show();
      this.adminService.user_report(this.model).subscribe((result) => {
      this.result = result;
    },
    (err) => this.spinner.hide(),
    () => {
      if (this.result.status === 'success') {
        this.reportData = this.result.data;
        this.totalRecords = this.result.data.length
        console.log(this.result)
        this.spinner.hide();
      } else {
        this.spinner.hide();
        this.messageService.add({severity:'error', summary: 'Success', detail:this.result.message});
      }
    });
  }
formatDate(date){
  return moment(date).format('MM/DD/YYYY')
}
}
