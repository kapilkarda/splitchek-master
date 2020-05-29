import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params, Data } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-replyticket',
  templateUrl: './replyticket.component.html',
  styleUrls: ['./replyticket.component.css']
})


export class ReplyticketComponent implements OnInit {
  model: any = {
    // "answer": "",
    "ans":"",
    "id": "",
    "ticketStatus":"",
    "ischat":"",
    "dateTime":new Date()
  };
  // items:any=[];
  result: any;
  ticketId: any;
  ticketlistData: any =[];
  Data: any
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
          console.log(this.ticketlistData,"data")


          // this.model.ans = this.ticketlistData.answer;
          // this.items = this.ticketlistData.answer;
          for(let statusValue of this.ticketlistData){


            // console.log(statusValue.ticketStatus,"*")
          }
          this.Data = localStorage.getItem("getStatus");
          this.model.ticketStatus =this.Data ;
          console.log("modellll ", this.model)
          this.spinner.hide();
        }
      });
    }
  }

  replyBack() {
    if(this.model.ticketStatus == 'open'){
      this.model.ticketStatus = 'close'
      }else{
        this.model.ticketStatus = 'close'
      }
      this.model.dateTime = this.formatAMPM(this.model.dateTime)
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
  formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = date.toDateString()+' '+' at '+ hours + ':' + minutes + ' ' + ampm;
    return strTime;
    }


}
