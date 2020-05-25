import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params, Data} from '@angular/router';
import {NgForm} from '@angular/forms';
import {NgxSpinnerService} from 'ngx-spinner';
import {MessageService} from 'primeng/api';
import {AdminService} from '../../../services/admin.service';
import * as moment from 'moment';


@Component({
  selector: 'app-post-report',
  templateUrl: './post-report.component.html',
  styleUrls: ['./post-report.component.css']
})
export class PostReportComponent implements OnInit {
  model: any = {
    "start":"",
	  "end":""

  };
  date1:any = new Date();
  date2:any = new Date();
  result: any;
  user:any;
  reportData:any=[];
  totalRecords:any=0;
  display: boolean = false;
  fieldData:any;
  fieldTitle:any;
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
      this.model.start = moment(this.date1).format("YYYY-MM-DD");
      this.model.end = moment(this.date2).format("YYYY-MM-DD");
    }
    console.log(this.model)
    this.spinner.show();
    this.adminService.post_report(this.model).subscribe((result) => {
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
show(data) {

  this.display = true;
  if(data.field.length == 1){
    this.fieldData = data.field[0].field;
  }else{
    this.fieldData = data.field;
  }
  console.log(this.fieldData)
  this.fieldTitle = data.form_name
}
refresh(){
  this.model.start = '';
  this.model.end = '';
  this.date1 = undefined;
  this.date2 = undefined;
  this.report();
}
chkArray(val){
  return Array.isArray(val);
}
parseVal(val){
  console.log(val)
  return JSON.stringify(val)
}
}