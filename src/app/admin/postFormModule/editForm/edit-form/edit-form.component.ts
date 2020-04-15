import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params, Data} from '@angular/router';
import {NgForm} from '@angular/forms';
import {NgxSpinnerService} from 'ngx-spinner';
import {MessageService} from 'primeng/api';
import {AdminService} from '../../../../services/admin.service';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.css']
})
export class EditFormComponent implements OnInit {
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
  formId:any;
  formdata:any;
  constructor(
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private adminService: AdminService,
		private spinner: NgxSpinnerService,
		private messageService: MessageService) { }

  ngOnInit() {
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
               this.model.form_name = this.formdata.form_name;
               this.step = this.formdata.fields;
               this.model.fields = this.formdata.fields;
              //  console.log()
               console.log("modellll ",this.step)
               this.spinner.hide();
            }
         });
      }



    this.items = [{"id":'1',value:'customer1'},{"id":'2',value:'customer2'}];
    this.typeItem = [{id:'',value:'Please Select'},
                    {id:'text',value:'Text'},
                    {id:'select',value:'Select'},
                    {id:'radio',value:'Radio'},
                    {id:'checkbox',value:'Checkbox'},
                    {id:'file',value:'Upload'},
                    {id:'editor',value:'Editor'},
                    {id:'multiselect',value:'Multiselect'},
                    {id:'datepicker',value:'Datepicker'},
                    {id:'textarea',value:'Textarea'},
                    {id:'colorpicker',value:'Color Picker'},]
    // this.step[0].field = this.fields;
  }
	update_form() {
    console.log(this.fields)
    this.model.fields = this.step;
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
    let obj = {label:'',value:''}
    this.step[j].field[i].option.push(obj)
  }
  removeOptions(j,i,idx){
    this.step[j].field[i].option.splice(idx,1)
  }
  showOption(j,i,e){
    console.log(e,i)
    if(e.id == 'select' || e.id == 'multiselect' || e.id == 'radio' || e.id == 'checkbox'){
      let obj = {label:'',value:'',}
      this.step[j].field[i].option.push(obj)
      this.step[j].field[i].optionShow = true;
    }
  }
}
