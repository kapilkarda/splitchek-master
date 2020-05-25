import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CalendarModule } from 'primeng/calendar';
import { SpinnerModule } from 'primeng/spinner';
import { DialogModule } from 'primeng/dialog';
import { CKEditorModule } from 'ng2-ckeditor';
import { CustomFormsModule } from 'ng2-validation';
import { MultiSelectModule } from 'primeng/multiselect';
import { TreeviewModule } from 'ngx-treeview';
import { adminComponent } from './admin.component';
import { adminloginComponent } from './login/adminlogin.component';
import { adminheaderComponent } from './header/adminheader.component';
import { adminsidebarComponent } from './sidebar/adminsidebar.component';
import { admindashboardComponent } from './dashboardModule/admin_dashboard/admindashboard.component';
import { adminfooterComponent } from './footer/adminfooter.component';
import { managerolesComponent } from './rolesModule/manage_roles/manageroles.component';
import { addrolesComponent } from './rolesModule/add_roles/addroles.component';
import { editrolesComponent } from './rolesModule/edit_roles/editroles.component';
import { addstaffComponent } from './staffModule/add_staff/addstaff.component';
import { editstaffComponent } from './staffModule/edit_staff/editstaff.component';
import { managestaffComponent } from './staffModule/manage_staff/managestaff.component';
import { addcategoryComponent } from './categoryModule/add_category/addcategory.component';
import { managecategoryComponent } from './categoryModule/manage_category/managecategory.component';
import { editcategoryComponent } from './categoryModule/edit_category/editcategory.component';
import { NgSelect2Module } from 'ng-select2';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CheckboxModule } from 'primeng/checkbox';
import { FileUploadModule } from 'primeng/fileupload';
import { EditorModule } from 'primeng/editor';
import { TreeModule } from 'primeng/tree';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { NzTreeModule } from 'ng-zorro-antd/tree';


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
import { AdminService } from '../services/admin.service';
import { routing } from './admin.routing';
import { SubCategoryComponent } from './categoryModule/sub-category/sub-category.component';
import { DropdownModule } from 'primeng/dropdown';
import { CreateFormComponent } from './postFormModule/createForm/create-form/create-form.component';
import { FieldsetModule } from 'primeng/fieldset';
import { EditFormComponent } from './postFormModule/editForm/edit-form/edit-form.component';
import { ListFormComponent } from './postFormModule/listForm/list-form/list-form.component';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
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
import { ListAdsComponent } from './Ads/list-ads/list-ads.component';
import { AddAdsComponent } from './Ads/add-ads/add-ads.component';
import { EditAdsComponent } from './Ads/edit-ads/edit-ads.component';
import { ProfileComponent } from './profile/profile.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { ListticketComponent } from './ticketmodule/listticket/listticket.component';
import { ReplyticketComponent } from './ticketmodule/replyticket/replyticket.component';
import { DeductionComponent } from './reports/payment-report/deduction/deduction.component';
import { TransactionComponent } from './reports/payment-report/transaction/transaction.component';
import { DetaildeductionComponent } from './reports/payment-report/detaildeduction/detaildeduction.component';
import { AccordionModule} from 'primeng/primeng';
import { UserListPostComponent } from './userPost/list-post/list-post.component';
import { UserEditPostComponent } from './userPost/edit-post/edit-post.component';
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
		DynamicDialogModule,
		RadioButtonModule,
		CheckboxModule,
		FileUploadModule,
		EditorModule,
		TreeModule,
		OverlayPanelModule,
		NzTreeModule,
		NzInputModule,
		AccordionModule,

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
		CreatePostComponent,
		ListPostComponent,
		EditPostComponent,
		AddPlanComponent,
		ListPlanComponent,
		EditPlanComponent,
		AddUserComponent,
		ListUserComponent,
		EditUserComponent,
		AddFaqComponent,
		ListFaqComponent,
		EditFaqComponent,
		UserReportComponent,
		PostReportComponent,
		PaymentReportComponent,
		ListAdsComponent,
		AddAdsComponent,
		EditAdsComponent,
		ProfileComponent,
		ListticketComponent,
		ReplyticketComponent,
		DeductionComponent,
		TransactionComponent,
    DetaildeductionComponent,
    UserListPostComponent,
    UserEditPostComponent,

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
	providers: [AdminService],

})
export class AdminModule { }
