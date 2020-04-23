import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params, Data} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {MessageService} from 'primeng/api';
import {AdminService} from '../../../services/admin.service';
import {AppSettings} from '../../../../../appSettings';

@Component({
  selector: 'app-edit-ads',
  templateUrl: './edit-ads.component.html',
  styleUrls: ['./edit-ads.component.css']
})
export class EditAdsComponent implements OnInit {
  model: any = {
    "id":"",
    "name"  : "",
    "title" : "",
    "price" :"" ,
    "path"  :""
  };
 upImage ='../../../../assets/img/dummy.png';

 uploadUrl = AppSettings.API_ENDPOINT;
 result: any;
 categoryId:any;
 categorydata:any;

constructor(
  private router: Router,
  private adminService: AdminService,
  private activatedRoute: ActivatedRoute,
  private spinner: NgxSpinnerService,
  private messageService: MessageService,
) { }

ngOnInit() {
  if(localStorage.getItem('token') == null && localStorage.getItem('token') =='null'){
  this.router.navigate(['/']);
}
  this.activatedRoute.params
  .subscribe(
        (params: Params) => {
    this.categoryId = params['id'];
    this.model.id = this.categoryId;
        }
);
    if (this.categoryId) {
      let data ={
        id:this.categoryId
      }
  this.spinner.show();
  this.adminService.by_id_ad(data).subscribe(categorydata => {
        if (categorydata.status === 'success') {
           this.categorydata = categorydata.data;

           this.model.name = this.categorydata.name;
           this.model.title = this.categorydata.title;
           this.model.price = this.categorydata.price;
           this.model.path = this.categorydata.path;
           this.upImage = this.categorydata.path;
           console.log("modellll ",this.model)
           this.spinner.hide();
        }
     });
  }
}


edit_ad() {
  this.spinner.show();
  this.adminService.edit_ad(this.model).subscribe(result => {
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
