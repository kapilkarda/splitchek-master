import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params, Data} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {MessageService} from 'primeng/api';
import {AdminService} from '../../../services/admin.service';
import {AppSettings} from '../../../../../appSettings';


@Component({
  selector: 'app-add-ads',
  templateUrl: './add-ads.component.html',
  styleUrls: ['./add-ads.component.css']
})
export class AddAdsComponent implements OnInit {
  model: any = {
    "name"  : "",
    "title" : "",
    "price" :"" ,
    "path"  :""
  };
 result: any;
 upImage ='../../../../assets/img/dummy.png';

 uploadUrl = AppSettings.API_ENDPOINT;
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
}


post_ad() {
  this.spinner.show();
  this.adminService.post_ad(this.model).subscribe(result => {
    this.result = result;
  },
  (err) => console.log(err),
  () => {
    if (this.result.status === 'success') {
      this.spinner.hide();
      this.messageService.add({ severity: 'success', summary: 'Success', detail: this.result.message });
      this.router.navigate(['/admin/listAds']);
    } else {
      this.spinner.hide();
      this.messageService.add({ severity: 'error', summary: 'Error', detail: this.result.message });
    }
  });
}
uploadProgress(){
  this.spinner.show();
 }
 onBasicUploadAuto(e){
  this.spinner.hide();
   console.log(e)
   let path = e.originalEvent.body.data[0].filename;
   this.model.path = path;
   this.upImage = path;
 }
}
