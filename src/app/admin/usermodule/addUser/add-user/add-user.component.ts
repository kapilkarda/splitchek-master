import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params, Data} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {MessageService} from 'primeng/api';
import {AdminService} from '../../../../services/admin.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  model: any = {
    "name":"",
    "email":"",
    "phoneNumber":"",
    "password":"",
    "countryCode":{name: "Kuwait", dial_code: "+965", code: "KW"}
  };
 result: any;
 telCode:any;
 mobNumberPattern = "^((\\+91-?)|0)?[0-9]{10}$";
teld:any

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
  this.telcode()
}
telcode() {
  this.spinner.show();
  this.adminService.telCode().subscribe(result => {
    this.teld = result;
    console.log(this.teld)
  },
  (err) => console.log(err),
  () => {
    if (this.teld.status === 'success') {
      this.telCode = this.teld.data;
      this.spinner.hide();
    } else {
      this.spinner.hide();
      this.messageService.add({ severity: 'error', summary: 'Error', detail: this.teld.message });
    }
  });
}

add_user() {
  this.model.phoneNumber = `${this.model.countryCode.dial_code}${this.model.phoneNumber}`;
  this.model.email = this.model.email.toLowerCase();
  console.log(this.model)
  this.spinner.show();
  this.adminService.admin_add_user(this.model).subscribe(result => {
    this.result = result;
  },
  (err) => console.log(err),
  () => {
    if (this.result.status === 'success') {
      this.spinner.hide();
      this.messageService.add({ severity: 'success', summary: 'Success', detail: this.result.message });
      this.router.navigate(['/admin/listUser']);
    } else {
      this.spinner.hide();
      this.messageService.add({ severity: 'error', summary: 'Error', detail: this.result.message });
    }
  });
}
}
