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
import { CustomFormsModule } from 'ng2-validation'
import {adminComponent} from './admin.component';
import {adminloginComponent} from './login/adminlogin.component';
import {adminheaderComponent} from './header/adminheader.component';
import {adminsidebarComponent} from './sidebar/adminsidebar.component';
import {admindashboardComponent} from './dashboardModule/admin_dashboard/admindashboard.component';
import {adminfooterComponent} from './footer/adminfooter.component';
import {adminmanageusersComponent} from './usersModule/manage_users/adminmanageusers.component';
import {adminmanagesuspendedusersComponent} from './usersModule/manage_suspended_users/adminmanagesuspendedusers.component';
import {adminuserdetailComponent} from './usersModule/user_detail/adminuserdetail.component';
import {adminaddpagesComponent} from './pagesModule/add_pages/adminaddpages.component';
import {adminmanagepagesComponent} from './pagesModule/manage_pages/adminmanagepages.component';
import {adminadddealsComponent} from './dealsModule/add_deals/adminadddeals.component';
import {adminmanagedealsComponent} from './dealsModule/manage_deals/adminmanagedeals.component';
import {adminmanageinvitesComponent} from './invitesModule/manage_invites/adminmanageinvites.component';
import {adminmanagereporteduserComponent} from './reporteduserModule/manage_reporteduser/adminmanagereporteduser.component';
import {adminmanageblockeduserComponent} from './blockeduserModule/manage_blockeduser/adminmanageblockeduser.component';
import {AdminService} from '../services/admin.service';
import {routing} from './admin.routing';
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
		adminmanagereporteduserComponent,
		adminmanageblockeduserComponent,
	],
	providers: [AdminService]
})
export class AdminModule {}