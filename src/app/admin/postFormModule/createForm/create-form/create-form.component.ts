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
  step = [{field:[]}]
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
    this.items = [{"id":'1',value:'customer1'},{"id":'2',value:'customer2'}];
    this.typeItem = [{id:'',value:'Please Select'},
                    {id:'text',value:'Text'},
                    {id:'number',value:'Number'},
                    {id:'tel',value:'Tel'},
                    {id:'select',value:'Select'},
                    {id:'radio',value:'Radio'},
                    {id:'checkbox',value:'Checkbox'},
                    {id:'file',value:'Upload'},
                    {id:'editor',value:'Editor'},
                    {id:'multiselect',value:'Multiselect'},
                    {id:'datepicker',value:'Datepicker'},
                    {id:'daterangepicker',value:'DateRangePicker'},
                    {id:'timepicker',value:'timePicker'},
                    {id:'datetimepicker',value:'DateTimePicker'},
                    {id:'textarea',value:'Textarea'},]
    this.step[0].field = this.fields;
  }
	add_form() {
    console.log(this.fields)
    this.model.fields = this.step;
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
  AddStep(){
    let obj = {field:[{name:'',type:'',icon:'',value:'',option:[],optionShow:false}]}
    this.step.push(obj)
  }
  removeStep(i){
    this.step.splice(i,1)
  }
  AddField(i){
    let obj = {name:'',type:'',icon:'',value:'',option:[],optionShow:false}
    this.step[i].field.push(obj)
  }
  RemoveField(i,j){
    this.step[i].field.splice(j,1)
  }
  addOptions(j,i){
    let obj = {label:'',value:'',icon:''}
    this.step[j].field[i].option.push(obj)
  }
  removeOptions(j,i,idx){
    this.step[j].field[i].option.splice(idx,1)
  }
  showOption(j,i,e){
    console.log(e,i)
    if(e.id == 'select' || e.id == 'multiselect' || e.id == 'radio' || e.id == 'checkbox'){
      let obj = {label:'',value:'',icon:''}
      this.step[j].field[i].option.push(obj)
      this.step[j].field[i].optionShow = true;
    }
  }
  uploadProgress(){
    this.spinner.show();
   }
   onBasicUploadAuto(e,i,j){
    this.spinner.hide();
     console.log(e,i,j)
     let path = e.originalEvent.body.data[0].filename;
     this.step[i].field[j].icon = path;

   }
   onBasicUploadAuto1(e,j,i,ix){
    this.spinner.hide();
     console.log(e,i,j)
     let path = e.originalEvent.body.data[0].filename;
     this.step[j].field[i].option[ix].icon = path;

   }
}
