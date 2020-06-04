import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params, Data } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { AdminService } from '../../../services/admin.service';
import * as moment from 'moment';
@Component({
  selector: 'app-replyticket',
  templateUrl: './replyticket.component.html',
  styleUrls: ['./replyticket.component.css']
})


export class ReplyticketComponent implements OnInit {
  date = new Date()
  hours = this.date.getHours()
  minutes: any = this.date.getMinutes()
  ampm = this.hours >= 12 ? 'PM' : 'AM'

  model: any = {
    // "answer": "",
    "ans": "",
    "id": "",
    "ticketStatus": "",
    "ischat": "",
    "dateTime": ""
  };
  // items:any=[];
  result: any;
  ticketId: any;
  ticketlistData: any = [];
  Data: any
  strTime: string;
  constructor(
    private router: Router,
    private adminService: AdminService,
    private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private messageService: MessageService,
  ) { }

  ngOnInit() {
    if (localStorage.getItem('token') == null && localStorage.getItem('token') == 'null') {
      this.router.navigate(['/']);
    }
    this.activatedRoute.params
      .subscribe(
        (params: Params) => {
          this.ticketId = params['id'];
          this.model.id = this.ticketId;
        }
      );
    if (this.ticketId) {
      this.spinner.show();
      this.adminService.getTIcketList().subscribe((result) => {
        if (result.status === 'success') {
          this.ticketlistData = result.data
          // console.log(this.ticketlistData,"data")
          // this.model.ans = this.ticketlistData.answer;
          // this.items = this.ticketlistData.answer;
          // for(let statusValue of this.ticketlistData){
          // console.log(statusValue.ticketStatus,"*")
          // }
          this.Data = localStorage.getItem("getStatus");
          this.model.ticketStatus = this.Data;
          console.log("modellll ", this.model)
          this.spinner.hide();
        }
      });
    }
  }
  // formatAMPM(dateTime) {
  //   var hours = dateTime.getHours();
  //   var minutes = dateTime.getMinutes();
  //   var ampm = hours >= 12 ? 'pm' : 'am';
  //   hours = hours % 12;
  //   hours = hours ? hours : 12; // the hour '0' should be '12'
  //   minutes = minutes < 10 ? '0'+minutes : minutes;
  //   this.strTime = moment(dateTime).format('DD/MM/YYYY') +' '+' at '+ hours + ':' + minutes + ' ' + ampm;
  //   console.log(this.strTime,"*")
  //   // return   dateTime = strTime;

  //   }
  replyBack() {
    if (this.model.ticketStatus == 'open') {
      this.model.ticketStatus = 'close'
    } else {
      this.model.ticketStatus = 'close'
    }

    this.hours = this.hours % 12
    this.hours = this.hours ? this.hours : 12; // the hour '0' should be '12'
    this.minutes = this.minutes < 10 ? '0' + this.minutes : this.minutes
    this.model.dateTime = moment(this.date).format('DD/MM/YYYY') + ' ' + ' at ' + this.hours + ':' + this.minutes + ' ' + this.ampm;
   
    this.spinner.show();
    this.adminService.admin_ticket_reply_back(this.model).subscribe(result => {
      this.result = result;
    },
      (err) => console.log(err),
      () => {
        if (this.result.status === 'success') {
          this.spinner.hide();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: this.result.message });
          this.router.navigate(['/admin/listTicket']);
        } else {
          this.spinner.hide();
          this.messageService.add({ severity: 'error', summary: 'Error', detail: this.result.message });
        }
      });
  }



}
