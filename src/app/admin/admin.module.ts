import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {CommonModule} from '@angular/common';
import {TableModule} from 'primeng/table';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {CalendarModule} from 'primeng/calendar';
import {SpinnerModule} from 'primeng/spinner';
import {DialogModule} from 'primeng/dialog';
import {CKEditorModule} from 'ng2-ckeditor';
import {CustomFormsModule} from 'ng2-validation';
import {MultiSelectModule} from 'primeng/multiselect';
import { TreeviewModule } from 'ngx-treeview';
import {adminComponent} from './admin.component';
import {adminloginComponent} from './login/adminlogin.component';
import {adminheaderComponent} from './header/adminheader.component';
import {adminsidebarComponent} from './sidebar/adminsidebar.component';
import {admindashboardComponent} from './dashboardModule/admin_dashboard/admindashboard.component';
import {adminfooterComponent} from './footer/adminfooter.component';
import {managerolesComponent} from './rolesModule/manage_roles/manageroles.component';
import {addrolesComponent} from './rolesModule/add_roles/addroles.component';
import {editrolesComponent} from './rolesModule/edit_roles/editroles.component';
import {addstaffComponent} from './staffModule/add_staff/addstaff.component';
import {editstaffComponent} from './staffModule/edit_staff/editstaff.component';
import {managestaffComponent} from './staffModule/manage_staff/managestaff.component';
import {addcategoryComponent} from './categoryModule/add_category/addcategory.component';
import {managecategoryComponent} from './categoryModule/manage_category/managecategory.component';
import {editcategoryComponent} from './categoryModule/edit_category/editcategory.component';
import { NgSelect2Module } from 'ng-select2';


/*import {adminmanagefeedbacksComponent} from './feedbackModule/manage_feedbacks/adminmanagefeedbacks.component';
import {adminmanageusersComponent} from './usersModule/manage_users/adminmanageusers.component';
import {adminmanagesuspendedusersComponent} from './usersModule/manage_suspended_users/adminmanagesuspendedusers.component';
import {adminuserdetailComponent} from './usersModule/user_detail/adminuserdetail.component';
import {admincharmrdetailComponent} from './usersModule/charmr_detail/admincharmrdetail.component';
import {adminmanageuserdownloadsComponent} from './downloadModule/manage_downloads/adminmanageuserdownloads.component';
import {adminaddpagesComponent} from './pagesModule/add_pages/adminaddpages.component';
import {adminmanagepagesComponent} from './pagesModule/manage_pages/adminmanagepages.component';
import {adminadddealsComponent} from './dealsModule/add_deals/adminadddeals.component';
import {adminmanagedealsComponent} from './dealsModule/manage_deals/adminmanagedeals.component';
import {adminmanageinvitesComponent} from './invitesModule/manage_invites/adminmanageinvites.component';
import {adminmanagereporteduserComponent} from './reporteduserModule/manage_reporteduser/adminmanagereporteduser.component';
import {adminmanageblockeduserComponent} from './blockeduserModule/manage_blockeduser/adminmanageblockeduser.component';*/
import {AdminService} from '../services/admin.service';
import {routing} from './admin.routing';
import { SubCategoryComponent } from './categoryModule/sub-category/sub-category.component';
import {DropdownModule} from 'primeng/dropdown';
import { CreateFormComponent } from './postFormModule/createForm/create-form/create-form.component';
import {FieldsetModule} from 'primeng/fieldset';
import { EditFormComponent } from './postFormModule/editForm/edit-form/edit-form.component';
import { ListFormComponent } from './postFormModule/listForm/list-form/list-form.component';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
@NgModule({
	imports: [
		BrowserAnimationsModule,
		FormsModule,
		CustomFormsModule,
		ReactiveFormsModule,
		CommonModule,
		TableModule,
		ConfirmDialogModule,
		CalendarModule,
		SpinnerModule,
		DialogModule,
		CKEditorModule,
		MultiSelectModule,
		TreeviewModule,
    routing,
    NgSelect2Module,
		DropdownModule,
		FieldsetModule,
		DynamicDialogModule
	],
	declarations: [
		adminComponent,
		adminloginComponent,
		adminheaderComponent,
		adminsidebarComponent,
		admindashboardComponent,
		adminfooterComponent,
		managerolesComponent,
		addrolesComponent,
		editrolesComponent,
		addstaffComponent,
		editstaffComponent,
		managestaffComponent,
		addcategoryComponent,
		managecategoryComponent,
		editcategoryComponent,
		SubCategoryComponent,
		CreateFormComponent,
		EditFormComponent,
		ListFormComponent,

		//adminmanagefeedbacksComponent,
		//adminmanageusersComponent,
		//adminmanageuserdownloadsComponent,
		//adminmanagesuspendedusersComponent,
		//adminuserdetailComponent,
		//admincharmrdetailComponent,
		//adminaddpagesComponent,
		//adminmanagepagesComponent,
		//adminadddealsComponent,
		//adminmanagedealsComponent,
		//adminmanageinvitesComponent,
		//adminmanagereporteduserComponent,
		//adminmanageblockeduserComponent,
	],
  providers: [AdminService]
})
export class AdminModule {}
