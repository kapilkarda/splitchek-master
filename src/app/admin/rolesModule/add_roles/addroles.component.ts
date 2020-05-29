import {Component} from '@angular/core';
import {Router, ActivatedRoute, Params, Data} from '@angular/router';
import {NgForm} from '@angular/forms';
import {NgxSpinnerService} from 'ngx-spinner';
import {MessageService} from 'primeng/api';
import {AdminService} from '../../../services/admin.service';

@Component({
   selector: 'addroles',
   templateUrl: './addroles.html',
   styleUrls: ['addroles.css'],
})

export class addrolesComponent {
	model: any = {};
	result: any;
	// moduleList:any;
	
	constructor(
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private adminService: AdminService,
		private spinner: NgxSpinnerService,
		private messageService: MessageService,
	) { }

	ngOnInit() {
		// this.adminService.adminGetModuleList().subscribe(module => {
		// 	this.moduleList = module.data;
		// 	this.moduleList.forEach(item => item["selected"] = false);
		// },
		// (err) => console.log(err),
		// () => { 
		// }); 
	}

    add_role() { 
		// this.model.modules = this.moduleList; 
		
		console.log("mmmmmmmmmm ", this.model)
		
		this.spinner.show();
		this.adminService.admin_add_role(this.model).subscribe(result => {
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

	// onChangeModule(event, moduleId: any){  
	// 	for(let i=0; i<this.moduleList.length;i++){
	// 		if(this.moduleList[i]._id == moduleId){
	// 			this.moduleList[i].selected = event;
	// 		}
	// 	}
	// }
}