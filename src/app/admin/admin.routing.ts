import {Routes,RouterModule,CanActivate} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {adminComponent} from './admin.component';
import {adminloginComponent} from './login/adminlogin.component';
import {admindashboardComponent} from './dashboardModule/admin_dashboard/admindashboard.component';
import {addrolesComponent} from './rolesModule/add_roles/addroles.component';
import {managerolesComponent} from './rolesModule/manage_roles/manageroles.component';
import {editrolesComponent} from './rolesModule/edit_roles/editroles.component';

import {addstaffComponent} from './staffModule/add_staff/addstaff.component';
import {managestaffComponent} from './staffModule/manage_staff/managestaff.component';
import {editstaffComponent} from './staffModule/edit_staff/editstaff.component';

import {addcategoryComponent} from './categoryModule/add_category/addcategory.component';
import {managecategoryComponent} from './categoryModule/manage_category/managecategory.component';
import {editcategoryComponent} from './categoryModule/edit_category/editcategory.component';
import { SubCategoryComponent } from './categoryModule/sub-category/sub-category.component';
import { CreateFormComponent } from './postFormModule/createForm/create-form/create-form.component';
import { EditFormComponent } from './postFormModule/editForm/edit-form/edit-form.component';
import { ListFormComponent } from './postFormModule/listForm/list-form/list-form.component';
import { CreatePostComponent } from './adPost/createPost/create-post/create-post.component';
import { ListPostComponent } from './adPost/listPost/list-post/list-post.component';
import { EditPostComponent } from './adPost/editPost/edit-post/edit-post.component';
import { AddPlanComponent } from './plansModule/addPlan/add-plan/add-plan.component';
import { ListPlanComponent } from './plansModule/listPlan/list-plan/list-plan.component';
import { EditPlanComponent } from './plansModule/editPlan/edit-plan/edit-plan.component';
import { AddUserComponent } from './usermodule/addUser/add-user/add-user.component';
import { ListUserComponent } from './usermodule/listUser/list-user/list-user.component';
import { EditUserComponent } from './usermodule/editUser/edit-user/edit-user.component';
import { AddFaqComponent } from './faqmodule/addFaq/add-faq/add-faq.component';
import { ListFaqComponent } from './faqmodule/listFaq/list-faq/list-faq.component';
import { EditFaqComponent } from './faqmodule/editFaq/edit-faq/edit-faq.component';
import { UserReportComponent } from './reports/user-report/user-report.component';
import { PostReportComponent } from './reports/post-report/post-report.component';
import { PaymentReportComponent } from './reports/payment-report/payment-report.component';
import { AddAdsComponent } from './Ads/add-ads/add-ads.component';
import { ListAdsComponent } from './Ads/list-ads/list-ads.component';
import { EditAdsComponent } from './Ads/edit-ads/edit-ads.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuardService } from '../services/auth-guard.service';
import { ListticketComponent } from './ticketmodule/listticket/listticket.component';
import { ReplyticketComponent } from './ticketmodule/replyticket/replyticket.component';
import { TransactionComponent } from './reports/payment-report/transaction/transaction.component';
import { DeductionComponent } from './reports/payment-report/deduction/deduction.component';
import { DetaildeductionComponent } from './reports/payment-report/detaildeduction/detaildeduction.component';
/*import {adminaddpagesComponent} from './pagesModule/add_pages/adminaddpages.component';
import {adminmanagepagesComponent} from './pagesModule/manage_pages/adminmanagepages.component';
import {adminadddealsComponent} from './dealsModule/add_deals/adminadddeals.component';
import {adminmanagedealsComponent} from './dealsModule/manage_deals/adminmanagedeals.component';
import {adminmanageinvitesComponent} from './invitesModule/manage_invites/adminmanageinvites.component';
import {adminmanagereporteduserComponent} from './reporteduserModule/manage_reporteduser/adminmanagereporteduser.component';
import {adminmanageblockeduserComponent} from './blockeduserModule/manage_blockeduser/adminmanageblockeduser.component';
import {adminmanageusersComponent} from './usersModule/manage_users/adminmanageusers.component';
import {adminmanagesuspendedusersComponent} from './usersModule/manage_suspended_users/adminmanagesuspendedusers.component';
import {adminuserdetailComponent} from './usersModule/user_detail/adminuserdetail.component';
import {admincharmrdetailComponent} from './usersModule/charmr_detail/admincharmrdetail.component';
import {adminmanagefeedbacksComponent} from './feedbackModule/manage_feedbacks/adminmanagefeedbacks.component';
import {adminmanageuserdownloadsComponent} from './downloadModule/manage_downloads/adminmanageuserdownloads.component';*/

const routes: Routes = [
	{
      path: 'admin', component: adminComponent ,
      children: [
   		{path: '', component: adminloginComponent},
         {path: 'dashboard', component: admindashboardComponent,canActivate: [AuthGuardService]},
		 {
				path: 'addroles',
				component: addrolesComponent,
				canActivate: [AuthGuardService]
			},
			{
				path: 'editroles/:id',
				component: editrolesComponent,
				canActivate: [AuthGuardService]
			},
		 {
				path: 'manageroles',
				component: managerolesComponent,
				canActivate: [AuthGuardService]
			},

			{
				path: 'addstaff',
				component: addstaffComponent,
				canActivate: [AuthGuardService]
			},
			{
				path: 'editstaff/:id',
				component: editstaffComponent,
				canActivate: [AuthGuardService]
			},
		 {
				path: 'managestaff',
				component: managestaffComponent,
				canActivate: [AuthGuardService]
			},

			{
				path: 'addcategory/:id/:name',
				component: addcategoryComponent,
				canActivate: [AuthGuardService]
			},

			{
				path: 'managecategory',
				component: managecategoryComponent,
				canActivate: [AuthGuardService]
			},
			{
				path: 'editcategory/:id/:name/:pid/:pname',
				component: editcategoryComponent,
				canActivate: [AuthGuardService]
			},
			{
				path: 'subcategory/:id/:name',
				component: SubCategoryComponent,
				canActivate: [AuthGuardService]
			},
			{
				path: 'createForm',
				component: CreateFormComponent,
				canActivate: [AuthGuardService]
			},
			{
				path: 'listForm',
				component: ListFormComponent,
				canActivate: [AuthGuardService]
			},
			{
				path: 'editForm/:id',
				component: EditFormComponent,
				canActivate: [AuthGuardService]
			},
			{
				path: 'createPost',
				component: CreatePostComponent,
				canActivate: [AuthGuardService]
			},
			{
				path: 'listPost',
				component: ListPostComponent,
				canActivate: [AuthGuardService]
			},
			{
				path: 'editPost/:id',
				component: EditPostComponent,
				canActivate: [AuthGuardService]
			},
			{
				path: 'createPlan',
				component: AddPlanComponent,
				canActivate: [AuthGuardService]
			},
			{
				path: 'listPlan',
				component: ListPlanComponent,
				canActivate: [AuthGuardService]
			},
			{
				path: 'editplan/:id',
				component: EditPlanComponent,
				canActivate: [AuthGuardService]
			},
			{
				path: 'createUser',
				component: AddUserComponent,
				canActivate: [AuthGuardService]
			},
			{
				path: 'listUser',
				component: ListUserComponent,
				canActivate: [AuthGuardService]
			},
			{
				path: 'editUser/:id',
				component: EditUserComponent,
				canActivate: [AuthGuardService]
			},
			{
				path: 'createFaq',
				component: AddFaqComponent,
				canActivate: [AuthGuardService]
			},
			{
				path: 'listFaq',
				component: ListFaqComponent,
				canActivate: [AuthGuardService]
			},
			{
				path: 'editFaq/:id',
				component: EditFaqComponent,
				canActivate: [AuthGuardService]
			},
			{
				path: 'userReport',
				component: UserReportComponent,
				canActivate: [AuthGuardService]
			},
			{
				path: 'postReport',
				component: PostReportComponent,
				canActivate: [AuthGuardService]
			},
			{
				path: 'paymentReport',
				component: PaymentReportComponent,
				canActivate: [AuthGuardService]
			},
			{
				path: 'createAds',
				component: AddAdsComponent,
				canActivate: [AuthGuardService]
			},
			{
				path: 'listAds',
				component: ListAdsComponent,
				canActivate: [AuthGuardService]
			},
			{
				path: 'editAds/:id',
				component: EditAdsComponent,
				canActivate: [AuthGuardService]
			},
			{
				path: 'profile',
				component: ProfileComponent,
				canActivate: [AuthGuardService]
			},
			{
				path: 'listTicket',
				component: ListticketComponent,
				canActivate: [AuthGuardService]
			},
			{
				path: 'replyTicket/:id',
				component: ReplyticketComponent,
				canActivate: [AuthGuardService]
			},
			{
				path: 'deduction',
				component: DeductionComponent,
				canActivate: [AuthGuardService]
			},
			{
				path: 'transaction',
				component: TransactionComponent,
				canActivate: [AuthGuardService]
			},
			{
				path: 'deductiondetail',
				component: DetaildeductionComponent,
				canActivate: [AuthGuardService]
			},
         /*{path: 'manageusers', component: adminmanageusersComponent},
         {path: 'managedownloads', component: adminmanageuserdownloadsComponent},

         {path: 'suspendedusers', component: adminmanagesuspendedusersComponent},
         {path: 'addpages', component: adminaddpagesComponent},
         {path: 'managepages', component: adminmanagepagesComponent},
         {path: 'adddeals', component: adminadddealsComponent},
         {path: 'managedeals', component: adminmanagedealsComponent},
         {path: 'manageinvites', component: adminmanageinvitesComponent},
         {path: 'managereportedusers', component: adminmanagereporteduserComponent},
         {path: 'manageblockedusers', component: adminmanageblockeduserComponent},
         {path: 'managefeedbacks', component: adminmanagefeedbacksComponent},
         {path: 'viewdetail/:id', component: adminuserdetailComponent},
         {path: 'viewcharmrdetail/:id', component: admincharmrdetailComponent},*/

         {path: '**', redirectTo: 'dashboard'},
     	]
   }
];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);
