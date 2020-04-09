import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params, Data} from '@angular/router';
import {NgForm} from '@angular/forms';
import {NgxSpinnerService} from 'ngx-spinner';
import {MessageService} from 'primeng/api';
import {AdminService} from '../../../../services/admin.service';
import { TreeviewItem, TreeviewConfig } from 'ngx-treeview';

import {AppSettings} from '../../../../../../appSettings';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  model: any = {adminId:'',userId:'',catname:'',form_name:'',field:[]};
  result: any;
  roleList:any;
  moduleArr: any = { "modules": [] };
  categories:any;
  items:any=[];
  Customer:any = [{"name":"customer 1",_id:'1'},{"name":"customer 2",_id:'2'},{"name":"customer 3",_id:'3'}]
  steps:number=0;
  step:number=0;
  uploadUrl = AppSettings.API_ENDPOINT;
  upImage ='../../../../../assets/img/dummy.png';
  user:any;

 constructor(
   private router: Router,
   private activatedRoute: ActivatedRoute,
   private adminService: AdminService,
   private spinner: NgxSpinnerService,
   private messageService: MessageService,
 ) { }

 ngOnInit() {
  this.user = JSON.parse(localStorage.getItem('userInfo'))
  this.model.adminId = this.user._id;
 this.loadCategoryData();

 }
 getCatValue(e){
   console.log(e.form)
   this.loadFormData(e.form);
 }


 loadFormData(form) {
   let data = {
     id:form
   }
   this.spinner.show();
     this.adminService.getFormData(data).subscribe((result) => {
     this.result = result;
   },
   (err) => this.spinner.hide(),
   () => {
     if (this.result.status === 'success') {
       let items = this.result.data[0];
       this.model.form_name = items.form_name;
       this.items = items.fields;
       this.steps = this.items.length;
       console.log(this.items)
       this.spinner.hide();
     } else {
       this.spinner.hide();
       this.messageService.add({severity:'error', summary: 'Success', detail:this.result.message});
     }
   });
 }
 loadCategoryData() {
   console.log("hhhhhhhhhhhh")
   this.spinner.show();
     this.adminService.adminGetCategoryList().subscribe((result) => {
     this.result = result;
   },
   (err) => this.spinner.hide(),
   () => {
     if (this.result.status === 'success') {
       const categories = this.result.data;
       console.log(categories)
       let datCat = []
       for(let d of categories){
         if(d.form && d.form != 0){
           datCat.push(d)
         }
       }
       let objectName = {
          catname:'Choose Category',
          _id:''
        }
       this.categories = datCat;

      this.categories.splice(0, 0, objectName)
       // console.log(this.catList)
       this.spinner.hide();
     } else {
       this.spinner.hide();
       this.messageService.add({severity:'error', summary: 'Success', detail:this.result.message});
     }
   });
 }

 add_category() {
   this.model.field = this.items;
   this.model.catname = this.model.catname.catname;
   this.model.userId = this.model.userId._id;
   console.log(this.model)
   this.spinner.show();
   this.adminService.addAdminPost(this.model).subscribe(result => {
     this.result = result;
   },
   (err) => console.log(err),
   () => {
     if (this.result.status === 'success') {
       this.spinner.hide();
       this.messageService.add({ severity: 'success', summary: 'Success', detail: this.result.message });
       this.router.navigate(['/admin/listPost']);
     } else {
       this.spinner.hide();
       this.messageService.add({ severity: 'error', summary: 'Error', detail: this.result.message });
     }
   });
 }
 uploadProgress(){
  this.spinner.show();
 }
 onBasicUploadAuto(e,i,j){
  this.spinner.hide();
   console.log(e,i,j)
   let path = e.originalEvent.body.data[0].filename;
   this.items[i].field[j].value = path;
   this.upImage = path;
 }
 next(){
   if(this.step < this.items.length){
     this.step++;
   }
 }
 prev(){
   if(this.step != 0){
     this.step--;
   }
 }
}
