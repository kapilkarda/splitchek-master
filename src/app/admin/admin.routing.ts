import {Routes,RouterModule,CanActivate} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {adminComponent} from './admin.component';
import {adminloginComponent} from './login/adminlogin.component';
import {admindashboardComponent} from './dashboardModule/admin_dashboard/admindashboard.component';
import {adminaddpagesComponent} from './pagesModule/add_pages/adminaddpages.component';
import {adminmanagepagesComponent} from './pagesModule/manage_pages/adminmanagepages.component';
import {adminadddealsComponent} from './dealsModule/add_deals/adminadddeals.component';
import {adminmanagedealsComponent} from './dealsModule/manage_deals/adminmanagedeals.component';
import {adminmanageinvitesComponent} from './invitesModule/manage_invites/adminmanageinvites.component';
import {adminmanagereporteduserComponent} from './reporteduserModule/manage_reporteduser/adminmanagereporteduser.component';
import {adminmanageblockeduserComponent} from './blockeduserModule/manage_blockeduser/adminmanageblockeduser.component';
import {adminmanageusersComponent} from './usersModule/manage_users/adminmanageusers.component';
import {adminmanagesuspendedusersComponent} from './usersModule/manage_suspended_users/adminmanagesuspendedusers.component';
import {adminuserdetailComponent} from './usersModule/user_detail/adminuserdetail.component';

const routes: Routes = [
	{ 
      path: 'admin', component: adminComponent ,
      children: [
   		{path: '', component: adminloginComponent},
         {path: 'dashboard', component: admindashboardComponent},
         {path: 'manageusers', component: adminmanageusersComponent},
         {path: 'suspendedusers', component: adminmanagesuspendedusersComponent},
         {path: 'addpages', component: adminaddpagesComponent}, 
         {path: 'managepages', component: adminmanagepagesComponent},
         {path: 'adddeals', component: adminadddealsComponent}, 
         {path: 'managedeals', component: adminmanagedealsComponent},
         {path: 'manageinvites', component: adminmanageinvitesComponent},
         {path: 'managereportedusers', component: adminmanagereporteduserComponent},
         {path: 'manageblockedusers', component: adminmanageblockeduserComponent},
         {path: 'viewdetail/:id', component: adminuserdetailComponent},
         {path: '**', redirectTo: 'dashboard'},
     	]
   }
];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);