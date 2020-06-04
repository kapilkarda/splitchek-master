import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params, Data} from '@angular/router';
import {NgForm} from '@angular/forms';
import {NgxSpinnerService} from 'ngx-spinner';
import {MessageService} from 'primeng/api';
import {AdminService} from '../../../../services/admin.service';

import {AppSettings} from '../../../../../../appSettings';
@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.css']
})
export class CreateFormComponent implements OnInit {
  model: any = {form_name:'',fields:[]};
  result: any;
  roleList:any;
  moduleArr: any = { "modules": [] };
  categories:any;
  items:any=[];
  typeItem:any=[];
  fields = [{name:'',type:'',icon:'',value:'',option:[],optionShow:false}];
  Options = [];
  uploadUrl = AppSettings.API_ENDPOINT;
  upImage ='../../../../../assets/img/dummy.png';
  constructor(
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private adminService: AdminService,
		private spinner: NgxSpinnerService,
		private messageService: MessageService) { }

  ngOnInit() {
    if(localStorage.getItem('token') == null && localStorage.getItem('token') =='null'){
      this.router.navigate(['/']);
    }
    this.items = [{"id":'1',value:'customer1'},{"id":'2',value:'customer2'}];
    this.typeItem = ['Input','Number','Tel','Select','Radio','Checkbox','Upload','ImagePicker','Editor','Multiselect'
                    ,'Datepicker','DateRangePicker','TimePicker','DateTimePicker','Textarea']
    this.fields = this.fields;
  }
	add_form() {
    console.log(this.fields)
    this.model.fields = this.fields;
		this.spinner.show();
		this.adminService.admin_add_form(this.model).subscribe(result => {
			this.result = result;
		},
		(err) => console.log(err),
		() => {
			if (this.result.status === 'success') {
				this.spinner.hide();
				this.messageService.add({ severity: 'success', summary: 'Success', detail: this.result.message });
				this.router.navigate(['/admin/listForm']);
			} else {
				this.spinner.hide();
				this.messageService.add({ severity: 'error', summary: 'Error', detail: this.result.message });
			}
		});
  }

  AddField(){
    let obj = {name:'',type:'',icon:'',value:'',option:[],optionShow:false}
    this.fields.push(obj)
  }
  RemoveField(j){
    this.fields.splice(j,1)
  }
  addOptions(i){
    let obj = {label:'',value:'',icon:''}
    this.fields[i].option.push(obj)
  }
  removeOptions(i,idx){
    this.fields[i].option.splice(idx,1)
  }
  showOption(i,e){
    console.log(e,i)
    let val = e;
    if(val == 'Select' || val == 'Multiselect' || val == 'Radio' ){
      let obj = {label:'',value:'',icon:''}
      this.fields[i].option.push(obj)
      this.fields[i].optionShow = true;
    }
  }
  uploadProgress(){
    this.spinner.show();
   }
   onBasicUploadAuto(e,j){
    this.spinner.hide();
     console.log(e,j)
     let path = e.originalEvent.body.data[0].filename;
     this.fields[j].icon = path;

   }
   onBasicUploadAuto1(e,i,ix){
    this.spinner.hide();
     console.log(e,i)
     let path = e.originalEvent.body.data[0].filename;
     this.fields[i].option[ix].icon = path;

   }
}
