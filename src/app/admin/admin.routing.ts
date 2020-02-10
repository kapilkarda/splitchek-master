import {Routes,RouterModule,CanActivate} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {adminComponent} from './admin.component';
import {adminloginComponent} from './admin_login/adminlogin.component';
import {admindashboardComponent} from './dashboardModule/admin_dashboard/admindashboard.component';
import {adminheaderComponent} from './admin_header/adminheader.component';
import {adminaddpagesComponent} from './pagesModule/admin_add_pages/adminaddpages.component';
import {adminmanagepagesComponent} from './pagesModule/admin_manage_pages/adminmanagepages.component';
import {adminadddealsComponent} from './dealsModule/admin_add_deals/adminadddeals.component';
import {adminmanagedealsComponent} from './dealsModule/admin_manage_deals/adminmanagedeals.component';
import {adminmanageinvitesComponent} from './invitesModule/admin_manage_invites/adminmanageinvites.component';
import {adminmanageusersComponent} from './usersModule/admin_manage_users/adminmanageusers.component';
import {adminmanagesuspendedusersComponent} from './usersModule/admin_manage_suspended_users/adminmanagesuspendedusers.component';
import {adminuserdetailComponent} from './usersModule/admin_user_detail/adminuserdetail.component';
import {adminaddtraitsComponent} from './traitsModule/admin_add_traits/adminaddtraits.component';
import {adminmanagetraitsComponent} from './traitsModule/admin_manage_traits/adminmanagetraits.component';

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
         {path: 'viewdetail/:id', component: adminuserdetailComponent},
         {path: 'addtraits', component: adminaddtraitsComponent}, 
         {path: 'managetraits', component: adminmanagetraitsComponent},
         {path: '**', redirectTo: 'dashboard'},
     	]
   }
];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);