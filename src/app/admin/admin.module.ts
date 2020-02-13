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
import { CKEditorModule } from 'ng2-ckeditor';
import {adminComponent} from './admin.component';
import {adminloginComponent} from './admin_login/adminlogin.component';
import {adminheaderComponent} from './admin_header/adminheader.component';
import {adminsidebarComponent} from './admin_sidebar/adminsidebar.component';
import {admindashboardComponent} from './dashboardModule/admin_dashboard/admindashboard.component';
import {adminfooterComponent} from './admin_footer/adminfooter.component';
import {adminmanageusersComponent} from './usersModule/admin_manage_users/adminmanageusers.component';
import {adminmanagesuspendedusersComponent} from './usersModule/admin_manage_suspended_users/adminmanagesuspendedusers.component';
import {adminuserdetailComponent} from './usersModule/admin_user_detail/adminuserdetail.component';
import {adminaddpagesComponent} from './pagesModule/admin_add_pages/adminaddpages.component';
import {adminmanagepagesComponent} from './pagesModule/admin_manage_pages/adminmanagepages.component';
import {adminadddealsComponent} from './dealsModule/admin_add_deals/adminadddeals.component';
import {adminmanagedealsComponent} from './dealsModule/admin_manage_deals/adminmanagedeals.component';
import {adminmanageinvitesComponent} from './invitesModule/admin_manage_invites/adminmanageinvites.component';
import {adminaddtraitsComponent} from './traitsModule/admin_add_traits/adminaddtraits.component';
import {adminmanagetraitsComponent} from './traitsModule/admin_manage_traits/adminmanagetraits.component';
import {AdminService} from '../services/admin.service';
import {routing} from './admin.routing';
import { CustomFormsModule } from 'ng2-validation'
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
		routing
	],
	declarations: [
		adminComponent,
		adminloginComponent,
		adminheaderComponent,
		adminsidebarComponent,
		admindashboardComponent,
		adminfooterComponent,
		adminmanageusersComponent,
		adminmanagesuspendedusersComponent,
		adminuserdetailComponent,
		adminaddpagesComponent,
		adminmanagepagesComponent,
		adminadddealsComponent,
		adminmanagedealsComponent,
		adminmanageinvitesComponent,
		adminaddtraitsComponent,
		adminmanagetraitsComponent,
	],
	providers: [AdminService]
})
export class AdminModule {}