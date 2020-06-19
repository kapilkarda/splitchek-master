import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params, Data} from '@angular/router';
import {NgForm} from '@angular/forms';
import {NgxSpinnerService} from 'ngx-spinner';
import {MessageService} from 'primeng/api';
import {AdminService} from '../../../../services/admin.service';

import {AppSettings} from '../../../../../../appSettings';
@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.css']
})
export class EditFormComponent implements OnInit {
  model: any = {id:'',form_name:'',fields:[]};
  result: any;
  roleList:any;
  moduleArr: any = { "modules": [] };
  categories:any;
  items:any=[];
  typeItem:any=[];
  step = [{field:[]}]
  fields = [{name:'',type:'',icon:'',value:'',option:[],optionShow:false}];
  Options = [];
  formId:any;
  formdata:any;
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
    this.activatedRoute.params
			.subscribe(
            (params: Params) => {
				this.formId = params['id'];
            }
		);
        if (this.formId) {
          let data = {
            id:this.formId
          }
			this.spinner.show();
			this.adminService.admin_load_formData(data).subscribe(categorydata => {
            if (categorydata.status === 'success') {
               this.formdata = categorydata.data;
               //this.selectedModuleList = roledata.data.modules;
               //this.selectedModuleList = roledata.data.modules;
               //this.selectedModuleList = roledata.data.modules.filter( (module) => module.checked );
               //console.log("selectedModuleList ",this.selectedModuleList);

               //console.log("ml",this.moduleList)
               this.model.id = this.formId;
               this.model.form_name = this.formdata.form_name;
               this.fields = this.formdata.fields;
               this.model.fields = this.formdata.fields;
              //  console.log()
               console.log("modellll ",this.step)
               this.spinner.hide();
            }
         });
      }



    this.items = [{"id":'1',value:'customer1'},{"id":'2',value:'customer2'}];
    this.typeItem =  ['Input','Number','Select','Radio','Checkbox','Upload','ImagePicker','Multiselect'
    ,'Datepicker','Textarea']
    // this.step[0].field = this.fields;
  }
	update_form() {
    console.log(this.fields)
    this.model.fields = this.fields;
		this.spinner.show();
		this.adminService.admin_update_form(this.model).subscribe(result => {
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
     console.log(e)
     let path = e.originalEvent.body.data[0].filename;
     this.fields[i].option[ix].icon = path;

   }
}
