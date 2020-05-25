import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params, Data} from '@angular/router';
import {NgForm} from '@angular/forms';
import {NgxSpinnerService} from 'ngx-spinner';
import {MessageService} from 'primeng/api';
import {AdminService} from '../../../services/admin.service';
import * as moment from 'moment';


@Component({
  selector: 'app-payment-report',
  templateUrl: './payment-report.component.html',
  styleUrls: ['./payment-report.component.css']
})
export class PaymentReportComponent implements OnInit {
  model: any = {
    type:"",
    startDate:"",
    endDate:""
    };
    date1:any = new Date();
    date2:any = new Date();
  result: any;
  Customer:any=[]
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
    this.loadUserData()
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
  report() {
    // if(this.model.type == 'range'){

      if(this.date1 && this.date2){

        this.model.startDate = moment(this.date1).format("YYYY-MM-DD");
        this.model.endDate = moment(this.date2).format("YYYY-MM-DD");
      // }
    }
    // else{
    //   this.model.startDate = '';
    //     this.model.endDate = '';
    // }
    console.log(this.model)
    this.spinner.show();
      this.adminService.payment_report(this.model).subscribe((result) => {
      this.result = result;
      console.log(this.result)
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

getUser(id){
  for(let k of this.Customer){
    if(k._id == id){
      console.log(k)
      return k.name
    }
  }
}
refresh(){
  // this.model.type = '';
  this.model.startDate = '';
  this.model.endDate = '';
  this.date1 = undefined;
  this.date2 = undefined;
  this.report();
}
}
