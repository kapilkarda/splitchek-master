import {Component} from '@angular/core';
import {Router, ActivatedRoute, Params, Data} from '@angular/router';
import {NgForm} from '@angular/forms';
import {NgxSpinnerService} from 'ngx-spinner';
import {MessageService} from 'primeng/api';
import {AdminService} from '../../../services/admin.service';

@Component({
	selector: 'editroles',
	templateUrl: './editroles.html',
	styleUrls: ['editroles.css'],
})

export class editrolesComponent {
	model: any = {};
	roleId: any;
	roledata: any;
	selectedModuleList:any;
	result: any;
	
	constructor(
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private adminService: AdminService,
		private spinner: NgxSpinnerService,
		private messageService: MessageService,
	) {}

	ngOnInit() { 
		this.activatedRoute.params
			.subscribe(
				(params: Params) => {
					this.roleId = params['id'];
				}
			);
        this.loadModuleList();
	}
	

	loadModuleList(){
		if (this.roleId !== undefined) {
			this.spinner.show();
			this.adminService.admin_load_roleData(this.roleId).subscribe(roledata => {
				if (roledata.status === 'success') {
					this.roledata = roledata.data;
					this.selectedModuleList = roledata.data.modules;
					this.model = this.roledata;
					this.spinner.hide();
				}
			});
		} 
	}

    edit_role() { 
		this.model.modules = this.selectedModuleList; 
		this.spinner.show();
		this.adminService.admin_edit_role(this.model).subscribe(result => {
			this.result = result;
		},
		(err) => console.log(err),
		() => {
			if (this.result.status === 'success') {
				this.spinner.hide();
				this.messageService.add({ severity: 'success', summary: 'Success', detail: this.result.message });
				this.router.navigate(['/admin/manageroles']);
			} else {
				this.spinner.hide();
				this.messageService.add({ severity: 'error', summary: 'Error', detail: this.result.message });
			}
		}); 
	}  
	
	onChangeModule(event, moduleId: any){  
		for(let i=0; i<this.selectedModuleList.length;i++){
			if(this.selectedModuleList[i]._id == moduleId){
				this.selectedModuleList[i].selected = event;
			}
		}
	}
}