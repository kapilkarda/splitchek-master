import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, Data } from '@angular/router';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { AdminService } from '../../services/admin.service';
import { AppSettings } from '../../../../appSettings';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  mArr: any = [];
  sArr: any = [];
  result: any;
  upImage = '../../../../assets/img/dummy.png';

  uploadUrl = AppSettings.API_ENDPOINT;
  user: any;
  model = {
    "id": "",
    "email": "",
    "name": "",
    "image": "",
    "phoneNumber":""
  }
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private adminService: AdminService,
    private spinner: NgxSpinnerService,
    private messageService: MessageService) {
    if (localStorage.getItem('token') == null && localStorage.getItem('token') == 'null') {
      this.router.navigate(['/']);
    }
    this.user = JSON.parse(localStorage.getItem('userInfo'))
    this.model.id = this.user._id
    this.model.email = this.user.email
    this.model.name = this.user.name
    this.model.email = this.user.email
    this.model.phoneNumber = this.user.phoneNumber
  }

  ngOnInit() {
    // localStorage.setItem('nameAccess',this.model.name)
  }
  updateProfile() {
    this.spinner.show();
    this.adminService.updateProfile(this.model).subscribe((result) => {
      localStorage.setItem('userName', this.model.name)
      this.result = result;
    },
      (err) => this.spinner.hide(),
      () => {
        if (this.result.status === 'success') {
          console.log(this.result)
          this.messageService.add({ severity: 'success', summary: 'Success', detail: this.result.message });
          this.router.navigate(['/admin/dashboard']);
        } else {
          this.spinner.hide();
          this.messageService.add({ severity: 'error', summary: 'Success', detail: this.result.message });
        }
      });
  }
  uploadProgress() {
    this.spinner.show();
  }
  onBasicUploadAuto(e) {
    this.spinner.hide();
    console.log(e)
    let path = e.originalEvent.body.data[0].filename;
    this.model.image = path;
    localStorage.setItem("img",this.model.image)
    this.upImage = path;
  }
}
