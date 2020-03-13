import {Component} from '@angular/core';
import {Router,ActivatedRoute,Params,Data} from '@angular/router';
import {NgForm} from '@angular/forms';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {NgxSpinnerService} from 'ngx-spinner';
import {MessageService} from 'primeng/api';
import {ConfirmationService} from 'primeng/api';
import {AdminService} from '../../../services/admin.service';
import {SelectItem} from 'primeng/api';
import {ExportToCsv} from 'export-to-csv';

@Component({
	selector: 'adminmanageuserdownloads',
	templateUrl: './adminmanageuserdownloads.html',
	styleUrls: ['adminmanageuserdownloads.css'],
})

export class adminmanageuserdownloadsComponent {
	model: any = {};
	result: any;
	userData: any;
	totalRecords: number;
	display: boolean = false;
	userdata:any;
	displayFields:any;
	cities: any;
	selectedCities:any;
	fieldDisplay:any = {'email':true,'status':true,'gender':true,'name':true,'loginType':true};
	filter:boolean = false;
	data:any = [];
	dataObject:any = {};
	
	constructor(
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private adminService: AdminService,
		private spinner: NgxSpinnerService,
		private messageService: MessageService,
		private confirmationService: ConfirmationService,
	) {
		this.cities = [
			{label: 'Email', value: 'email'},
			{label: 'Status', value: 'status'},
			{label: 'Gender', value: 'gender'},
			{label: 'Name', value: 'name'},
			{label: 'Login From', value: 'loginType'},
			
	   ];
	}
	ngOnInit() {
		this.loadUsersData();
	}

	loadUsersData() {
		this.spinner.show();
		this.adminService.admin_list_users().subscribe((result) => {
			this.result = result;
		},
		(err) => this.spinner.hide(),
		() => {
			if (this.result.status === 'success') {
				this.userData = this.result.data;
				this.totalRecords = this.result.data.length;
				this.spinner.hide();
			} else {
				this.spinner.hide();
				this.messageService.add({severity:'error', summary: 'Success', detail:this.result.message});
			}
		});
	}
	
	filterData(){
		//console.log(this.model.fielddata.length)
		if(this.model.fielddata){
		this.spinner.show();
		this.adminService.admin_filterdata(this.model).subscribe((result) => {
			this.result = result;
		},
		(err) => this.spinner.hide(),
		() => {
			if (this.result.status === 'success') {
				if(this.model.fielddata){
					this.displayFields = this.model.fielddata;
				}
				if(this.displayFields.length>0){ 
					this.filter = true;
					this.fieldDisplay.email= false;
					this.fieldDisplay.status= false;
					this.fieldDisplay.gender= false;
					this.fieldDisplay.name= false;
					this.fieldDisplay.loginType= false;
					
					if(this.displayFields.includes('email')){
						this.fieldDisplay.email= true;
					}
					if(this.displayFields.includes('status')){
						this.fieldDisplay.status= true;
					}
					if(this.displayFields.includes('gender')){
						this.fieldDisplay.gender= true;
					}
					if(this.displayFields.includes('name')){
						this.fieldDisplay.name= true;
					}
					if(this.displayFields.includes('loginType')){
						this.fieldDisplay.loginType= true;
					}
					 /* for(let i=0;i<this.displayFields.length;i++){
						if(this.displayFields && this.displayFields[i] == "email" ){
							this.fieldDisplay.email= true;
						}
						if(this.displayFields && this.displayFields[i] == "status" ){
							this.fieldDisplay.status= true;
						}
					} */
				} 
				this.userData = this.result.data;
				this.totalRecords = this.result.data.length;
				this.spinner.hide();
			} else {
				this.spinner.hide();
				this.messageService.add({severity:'error', summary: 'Success', detail:this.result.message});
			}
		});
	}
	}

	 downloadData(){
		this.data = [];
		if(this.model.fielddata){ 
			this.userData.forEach((item, index) => {
				let objects = {};
				//for(let i=0;i<this.model.fielddata.length;i++){ 
					if(this.model.fielddata.includes('email')){
						if(item.email!=undefined){ 
							objects['email'] = item.email;
						}else{
							objects['email'] = "";
						}
					}
					if(this.model.fielddata.includes('status')){
						if(item.status!=undefined){
							objects["status"] = item.status;
						}else{
							objects["status"] = "";
						}
					}
					if(this.model.fielddata.includes('gender')){
						if(item.gender!=undefined){
							objects["gender"] = item.gender;
						}else{
							objects["gender"] = "";
						}
					}
					if(this.model.fielddata.includes('name')){
						if(item.name!=undefined){
							objects["name"] = item.name;
						}else{
							objects["name"] = "";
						}
					}
					if(this.model.fielddata.includes('loginType')){
						if(item.loginType!=undefined){
							objects["loginType"] = item.loginType;
						}else{
							objects["loginType"] = "";
						}
					}

					/* if(this.model.fielddata[i] == 'email'){
						if(item.email!=undefined){ 
							objects['email'] = item.email;
						}else{
							objects['email'] = "";
						}
					} */
					/* if(this.model.fielddata[i] == 'status'){ 
						if(item.status!=undefined){
							objects["status"] = item.status;
						}else{
							objects["status"] = "";
						}
					} */
					/* if(this.model.fielddata[i] == 'gender'){ 
						if(item.gender!=undefined){
							objects["gender"] = item.gender;
						}else{
							objects["gender"] = "";
						}
					} */
					this.data.push(objects);
				//}
			});
		}else{
			this.data = this.userData;
		}
		const options = { 
			filename:'userreport',
			fieldSeparator: ',',
			quoteStrings: '"',
			decimalSeparator: '.',
			showLabels: true, 
			showTitle: false,
			title: 'User Report CSV',
			useTextFile: false,
			useBom: true,
			useKeysAsHeaders: true,
		};
		const csvExporter = new ExportToCsv(options);
 		csvExporter.generateCsv(this.data);
 	} 
}