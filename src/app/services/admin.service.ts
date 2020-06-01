import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { AppSettings } from '../../../appSettings';
import 'rxjs/add/operator/map';


@Injectable()
export class AdminService {

	constructor(private http: HttpClient) { }

	admin_login(user) {
		let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
		let options = { headers: headers, method: 'post' };
		return this.http.post(AppSettings.API_ENDPOINT + 'adminLogin', user, options).map(res => <any>res);
	}

	adminGetRolesList() {
		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': localStorage.getItem('token')
		});
		let options = { headers: headers };
		return this.http.get(AppSettings.API_ENDPOINT + 'getRoles', options).map(res => <any>res);
	}

	adminGetModuleList() {
		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': localStorage.getItem('token')
		});
		let options = { headers: headers };
		return this.http.get(AppSettings.API_ENDPOINT + 'getModules', options).map(res => <any>res);
	}

	admin_load_roleData(roleId) {
		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': localStorage.getItem('token'),
			'roleid': roleId.toString()
		});
		let options = { headers: headers };
		return this.http.get(AppSettings.API_ENDPOINT + 'getrolebyid', options).map(res => <any>res);
	}

	admin_add_role(role) {
		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': localStorage.getItem('token')
		});
		let options = { headers: headers, method: 'post' };
		return this.http.post(AppSettings.API_ENDPOINT + 'adminAddRole', role, options).map(res => <any>res);
	}

	admin_edit_role(role) {
		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': localStorage.getItem('token')
		});
		let options = { headers: headers };
		return this.http.post(AppSettings.API_ENDPOINT + 'adminAddRole', role, options).map(res => <any>res);
	}

	admin_change_role_status(roleId, currentStatus) {
		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': localStorage.getItem('token'),
			'roleid': roleId.toString(),
			'status': currentStatus.toString()
		});
		let options = { headers: headers };
		return this.http.get(AppSettings.API_ENDPOINT + 'adminChangeStatus', options).map(res => <any>res);
	}

	admin_delete_role(roleId) {
		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': localStorage.getItem('token'),
			'roleid': roleId.toString()
		});
		let options = { headers: headers };
		return this.http.get(AppSettings.API_ENDPOINT + 'adminDeleteRole', options).map(res => <any>res);
	}

	admin_add_staff(staff) {
		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': localStorage.getItem('token')
		});
		let options = { headers: headers };
		return this.http.post(AppSettings.API_ENDPOINT + 'adminAddStaff', staff, options).map(res => <any>res);
	}

	admin_load_staffData(staffId) {
		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': localStorage.getItem('token'),
			'staffid': staffId.toString()
		});
		let options = { headers: headers };
		return this.http.get(AppSettings.API_ENDPOINT + 'getstaffbyid', options).map(res => <any>res);
	}

	adminGetStaffList() {
		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': localStorage.getItem('token')
		});
		let options = { headers: headers };
		return this.http.get(AppSettings.API_ENDPOINT + 'getStaff', options).map(res => <any>res);
	}

	admin_delete_staff(staffId) {
		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': localStorage.getItem('token'),
			'staffid': staffId.toString()
		});
		let options = { headers: headers };
		return this.http.get(AppSettings.API_ENDPOINT + 'adminDeleteStaff', options).map(res => <any>res);
	}

	admin_change_staff_status(staffId, currentStatus) {
		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': localStorage.getItem('token'),
			'roleid': staffId.toString(),
			'status': currentStatus.toString()
		});
		let options = { headers: headers };
		return this.http.get(AppSettings.API_ENDPOINT + 'adminChangeStaffStatus', options).map(res => <any>res);
	}

	admin_add_category(data) {
		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': localStorage.getItem('token')
		});
		let options = { headers: headers };
		return this.http.post(AppSettings.API_ENDPOINT + 'addCategory', data, options).map(res => <any>res);
	}
	admin_edit_category(data) {
		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': localStorage.getItem('token')
		});
		let options = { headers: headers };
		return this.http.post(AppSettings.API_ENDPOINT + 'editCategory', data, options).map(res => <any>res);
	}
	adminGetCategoryList() {
		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': localStorage.getItem('token')
		});
		let options = { headers: headers };
		return this.http.get(AppSettings.API_ENDPOINT + 'category', options).map(res => <any>res);
	}
	adminGetPagedCategoryList() {
		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': localStorage.getItem('token'),
		});
		let options = { headers: headers };
		return this.http.get(AppSettings.API_ENDPOINT + 'sub_cat_form_category', options).map(res => <any>res);
	}
	adminGetSubCategoryList(data) {
		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': localStorage.getItem('token'),
		});
		let options = { headers: headers };
		return this.http.post(AppSettings.API_ENDPOINT + 'subCategory', data, options).map(res => <any>res);
	}
	admin_delete_category(data1) {
		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': localStorage.getItem('token'),
		});
		let options = { headers: headers };
		let data = { data: data1 }
		return this.http.post(AppSettings.API_ENDPOINT + 'deleteCategory', data, options).map(res => <any>res);
	}

	admin_change_category_status(data1) {
		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': localStorage.getItem('token'),
		});
		let data = { data: data1 }
		let options = { headers: headers };
		return this.http.post(AppSettings.API_ENDPOINT + 'categoryStatus', data, options).map(res => <any>res);
	}

	admin_load_categoryData(categoryId) {
		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': localStorage.getItem('token')
		});
		let data = {
			id: categoryId
		}
		let options = { headers: headers };
		return this.http.post(AppSettings.API_ENDPOINT + 'categoryById', data, options).map(res => <any>res);
	}


	admin_add_form(data) {
		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': localStorage.getItem('token')
		});
		let options = { headers: headers };
		return this.http.post(AppSettings.API_ENDPOINT + 'addForm', data, options).map(res => <any>res);
	}
	getFormList() {
		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': localStorage.getItem('token')
		});
		let options = { headers: headers };
		return this.http.get(AppSettings.API_ENDPOINT + 'viewForm', options).map(res => <any>res);
	}
	admin_delete_form(data) {
		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': localStorage.getItem('token')
		});
		let options = { headers: headers };
		return this.http.post(AppSettings.API_ENDPOINT + 'deleteForm', data, options).map(res => <any>res);
	}
	admin_update_form(data) {
		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': localStorage.getItem('token')
		});
		let options = { headers: headers };
		return this.http.post(AppSettings.API_ENDPOINT + 'updateForm', data, options).map(res => <any>res);
	}
	admin_load_formData(data) {
		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': localStorage.getItem('token')
		});
		let options = { headers: headers };
		return this.http.post(AppSettings.API_ENDPOINT + 'formById', data, options).map(res => <any>res);
	}

	getFormData(data) {
		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': localStorage.getItem('token')
		});
		let options = { headers: headers };
		return this.http.post(AppSettings.API_ENDPOINT + 'fetchFormAdverPost', data, options).map(res => <any>res);
	}
	updateFormStats(data) {

		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': localStorage.getItem('token')
		});
		let options = { headers: headers };
		return this.http.post(AppSettings.API_ENDPOINT + 'updateStatusForm', data, options).map(res => <any>res);
	}

	addAdminPost(data) {
		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': localStorage.getItem('token')
		});
		let options = { headers: headers };
		return this.http.post(AppSettings.API_ENDPOINT + 'Admin/addAdverPost', data, options).map(res => <any>res);
	}
	admin_load_postData(data) {
		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': localStorage.getItem('token')
		});
		let options = { headers: headers };
		return this.http.post(AppSettings.API_ENDPOINT + 'byIdAdverPost', data, options).map(res => <any>res);
	}
	editAdminPost(data) {
		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': localStorage.getItem('token')
		});
		let options = { headers: headers };
		return this.http.post(AppSettings.API_ENDPOINT + 'editAdverPost', data, options).map(res => <any>res);
	}
	updatePostStatus(data) {

		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': localStorage.getItem('token')
		});
		let options = { headers: headers };
		return this.http.post(AppSettings.API_ENDPOINT + 'updateStatusAdverPost', data, options).map(res => <any>res);
	}
	updatePostFeatured(data) {

		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': localStorage.getItem('token')
		});
		let options = { headers: headers };
		return this.http.post(AppSettings.API_ENDPOINT + 'featuredStatusAdverPost', data, options).map(res => <any>res);
	}
	adminGetPostList(data) {
		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': localStorage.getItem('token')
		});
		let options = { headers: headers };
		return this.http.post(AppSettings.API_ENDPOINT + 'showAdverPost', data, options).map(res => <any>res);
	}
	admin_delete_post(data) {
		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': localStorage.getItem('token')
		});
		let options = { headers: headers };
		return this.http.post(AppSettings.API_ENDPOINT + 'deleteAdverPost', data, options).map(res => <any>res);
	}

	admin_add_plan(data) {
		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': localStorage.getItem('token')
		});
		let options = { headers: headers };
		return this.http.post(AppSettings.API_ENDPOINT + 'addPlansInfo', data, options).map(res => <any>res);
	}
	getPlanList() {
		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': localStorage.getItem('token')
		});
		let options = { headers: headers };
		return this.http.get(AppSettings.API_ENDPOINT + 'showPlansInfo', options).map(res => <any>res);
	}
	admin_update_plan(data) {
		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': localStorage.getItem('token')
		});
		let options = { headers: headers };
		return this.http.post(AppSettings.API_ENDPOINT + 'updateStatusPlansInfo', data, options).map(res => <any>res);
	}

	admin_delete_plan(data) {
		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': localStorage.getItem('token')
		});
		let options = { headers: headers };
		return this.http.post(AppSettings.API_ENDPOINT + 'deletePlansInfo', data, options).map(res => <any>res);
	}
	admin_load_planData(data) {
		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': localStorage.getItem('token')
		});
		let options = { headers: headers };
		return this.http.post(AppSettings.API_ENDPOINT + 'plansInfoById', data, options).map(res => <any>res);
	}
	admin_edit_planData(data) {
		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': localStorage.getItem('token')
		});
		let options = { headers: headers };
		console.log(data,"datafromservice")
		return this.http.post(AppSettings.API_ENDPOINT + 'editPlansInfo', data, options).map(res => <any>res);
	}
	admin_add_user(data) {
		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': localStorage.getItem('token')
		});
		let options = { headers: headers };
		return this.http.post(AppSettings.API_ENDPOINT + 'AdminManageUser/addUser', data, options).map(res => <any>res);
	}
	getUserList() {
		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': localStorage.getItem('token')
		});
		let options = { headers: headers };
		return this.http.get(AppSettings.API_ENDPOINT + 'AdminManageUser/listUser', options).map(res => <any>res);
	}
	admin_delete_user(data) {
		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': localStorage.getItem('token')
		});
		let options = { headers: headers };
		return this.http.post(AppSettings.API_ENDPOINT + 'AdminManageUser/deleteUser', data, options).map(res => <any>res);
	}
	admin_update_user(data) {
		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': localStorage.getItem('token')
		});
		let options = { headers: headers };
		return this.http.post(AppSettings.API_ENDPOINT + 'AdminManageUser/updateStatusUser', data, options).map(res => <any>res);
	}
	admin_load_userData(data) {
		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': localStorage.getItem('token')
		});
		let options = { headers: headers };
		return this.http.post(AppSettings.API_ENDPOINT + 'AdminManageUser/userById', data, options).map(res => <any>res);
	}
	admin_edit_user(data) {
		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': localStorage.getItem('token')
		});
		let options = { headers: headers };
		return this.http.post(AppSettings.API_ENDPOINT + 'AdminManageUser/editUser', data, options).map(res => <any>res);
	}
	admin_add_faq(data) {
		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': localStorage.getItem('token')
		});
		let options = { headers: headers };
		return this.http.post(AppSettings.API_ENDPOINT + 'faq/addFAQ', data, options).map(res => <any>res);
	}
	getFaqList(data) {
		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': localStorage.getItem('token')
		});
		let options = { headers: headers };
		return this.http.post(AppSettings.API_ENDPOINT + 'faq/listFAQ', data, options).map(res => <any>res);
	}
	admin_delete_Faq(data) {
		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': localStorage.getItem('token')
		});
		let options = { headers: headers };
		return this.http.post(AppSettings.API_ENDPOINT + 'faq/deleteFAQ', data, options).map(res => <any>res);
	}
	admin_update_Faq(data) {
		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': localStorage.getItem('token')
		});
		let options = { headers: headers };
		return this.http.post(AppSettings.API_ENDPOINT + 'faq/updateStatusFAQ', data, options).map(res => <any>res);
	}

	admin_load_faqData(data) {
		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': localStorage.getItem('token')
		});
		let datas = {
			id: data
		}
		let options = { headers: headers };
		return this.http.post(AppSettings.API_ENDPOINT + 'faq/faqById', datas, options).map(res => <any>res);
	}

	admin_edit_faqData(data) {
		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': localStorage.getItem('token')
		});
		let options = { headers: headers };
		return this.http.post(AppSettings.API_ENDPOINT + 'faq/editFAQ', data, options).map(res => <any>res);
	}

	user_report(data) {
		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': localStorage.getItem('token')
		});
		let options = { headers: headers };
		return this.http.post(AppSettings.API_ENDPOINT + 'report/userReport', data, options).map(res => <any>res);
	}
	post_report(data) {
		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': localStorage.getItem('token')
		});
		let options = { headers: headers };
		return this.http.post(AppSettings.API_ENDPOINT + 'report/advertisementPostedReport', data, options).map(res => <any>res);
	}
	payment_report(data) {
		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': localStorage.getItem('token')
		});
		let options = { headers: headers };
		return this.http.post(AppSettings.API_ENDPOINT + 'report/paymentReport', data, options).map(res => <any>res);
	}
	list_ads() {
		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': localStorage.getItem('token')
		});
		let options = { headers: headers };
		return this.http.get(AppSettings.API_ENDPOINT + 'manageTise/list', options).map(res => <any>res);
	}
	post_ad(data) {
		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': localStorage.getItem('token')
		});
		let options = { headers: headers };
		return this.http.post(AppSettings.API_ENDPOINT + 'manageTise/add', data, options).map(res => <any>res);
	}
	delete_ad(data) {
		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': localStorage.getItem('token')
		});
		let options = { headers: headers };
		return this.http.post(AppSettings.API_ENDPOINT + 'manageTise/delete', data, options).map(res => <any>res);
	}
	update_ad(data) {
		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': localStorage.getItem('token')
		});
		let options = { headers: headers };
		return this.http.post(AppSettings.API_ENDPOINT + 'manageTise/updateStatus', data, options).map(res => <any>res);
	}
	edit_ad(data) {
		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': localStorage.getItem('token')
		});
		let options = { headers: headers };
		return this.http.post(AppSettings.API_ENDPOINT + 'manageTise/edit', data, options).map(res => <any>res);
	}
	by_id_ad(data) {
		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': localStorage.getItem('token')
		});
		let options = { headers: headers };
		return this.http.post(AppSettings.API_ENDPOINT + 'manageTise/findById', data, options).map(res => <any>res);
	}
	updateProfile(data) {
		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': localStorage.getItem('token')
		});

		let options = { headers: headers };
		return this.http.post(AppSettings.API_ENDPOINT + 'updateUserProfile', data, options).map(res => <any>res);
		
	}

	telCode() {
		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': localStorage.getItem('token')
		});
		let options = { headers: headers };
		return this.http.get(AppSettings.API_ENDPOINT + 'telCode', options).map(res => <any>res);
	}
	getTIcketList() {
		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': localStorage.getItem('token')
		});
		let options = { headers: headers };
		return this.http.get(AppSettings.API_ENDPOINT + 'viewTicketContent', options).map(res => <any>res);
	}
	admin_ticket_reply_back(data) {
		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': localStorage.getItem('token')
		});
		let options = { headers: headers };
		return this.http.post(AppSettings.API_ENDPOINT + 'replyBack', data, options).map(res => <any>res);
	}

	admin_update_Ticket(data) {
		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': localStorage.getItem('token')
		});
		let options = { headers: headers };
		// console.log(data,"value**")
		return this.http.post(AppSettings.API_ENDPOINT + 'createStatusTickets', data, options).map(res => <any>res);
	}
	admin_delete_Ticket(data) {
		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': localStorage.getItem('token')
		});
		let options = { headers: headers };
		return this.http.post(AppSettings.API_ENDPOINT + 'deleteTickets', data, options).map(res => <any>res);
	}
	deduction() {
		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': localStorage.getItem('token')
		});
		let options = { headers: headers };
		return this.http.get(AppSettings.API_ENDPOINT + 'deduction', options).map(res => <any>res);
	}


	

















































































	/*
	admin_add_page(page) {
		   let headers = new HttpHeaders({
		  'Content-Type': 'application/json',
		  'Authorization': localStorage.getItem('token')
	   });
	   let options = { headers: headers, method: 'post' };
	   return this.http.post(AppSettings.API_ENDPOINT + 'adminAddPage', page, options).map(res => <any>res);
	}
	admin_list_pages() {
		   let headers = new HttpHeaders({
			 'Content-Type': 'application/json',
			 'Authorization': localStorage.getItem('token')
		   });
		 let options = { headers: headers };
		 return this.http.get(AppSettings.API_ENDPOINT + 'adminListPages', options).map(res => <any>res);
	}
	admin_change_page_status(pageId,currentStatus) {
	   let headers = new HttpHeaders({
			 'Content-Type': 'application/json',
			 'Authorization': localStorage.getItem('token'),
			 'pageid': pageId,
			 'status': currentStatus.toString()
		 });
		 let options = { headers: headers };
		 return this.http.get(AppSettings.API_ENDPOINT + 'adminChangePageStatus',  options).map(res => <any>res);
	}
	admin_load_pageData(pageId) {
		   let headers = new HttpHeaders({
			 'Content-Type': 'application/json',
			 'Authorization': localStorage.getItem('token'),
			 'pageid': pageId
		 });
		 let options = { headers: headers };
		 return this.http.get(AppSettings.API_ENDPOINT + 'getPageById', options).map(res => <any>res);
	}
	admin_edit_page(page) {
		   let headers = new HttpHeaders({
			 'Content-Type': 'application/json',
			 'Authorization': localStorage.getItem('token'),
		 });
		 let options = { headers: headers, method: 'post' };
		 return this.http.post(AppSettings.API_ENDPOINT + 'adminAddPage', page, options).map(res => <any>res);
	}
	admin_delete_page(pageId) {
		   let headers = new HttpHeaders({
			 'Content-Type': 'application/json',
			 'Authorization': localStorage.getItem('token'),
			 'pageid': pageId.toString()
		 });
		 let options = { headers: headers };
		 return this.http.get(AppSettings.API_ENDPOINT + 'adminDeletePage',  options).map(res => <any>res);
	   }
	admin_add_deal(postData,files: Array<File>) {
		   return new Promise((resolve, reject) => {
			 var formData: any = new FormData();
			 var xhr = new XMLHttpRequest();
			 if(files && files.length> 0){
			 for(var i = 0; i < files.length; i++) {
			   formData.append("dealImages", files[i], files[i].name);
			   }
			 }
			 if(postData !=="" && postData !== undefined && postData !==null){
			   for (var property in postData) {
				 if (postData.hasOwnProperty(property)) {
					 formData.append(property, postData[property]);
				 }
			 }
			 }
			 xhr.onreadystatechange = function () {
			   if (xhr.readyState == 4) {
				if (xhr.status == 200) {
				   resolve((JSON.parse(xhr.response)));
				} else {
					   reject(xhr.response);
				}
			 }
			 }
			 var url = AppSettings.API_ENDPOINT + 'adminAddDeal';
			 xhr.open("POST", url,true);
			 xhr.setRequestHeader("Authorization", localStorage.getItem('token'));
			 xhr.send(formData);
		 });
	}
	 admin_list_deals() {
		   let headers = new HttpHeaders({
			 'Content-Type': 'application/json',
			 'Authorization': localStorage.getItem('token')
		 });
		 let options = { headers: headers };
		 return this.http.get(AppSettings.API_ENDPOINT + 'adminListDeals', options).map(res => <any>res);
	   }
	 admin_load_dealData(dealId) {
		   let headers = new HttpHeaders({
			 'Content-Type': 'application/json',
			 'Authorization': localStorage.getItem('token'),
			 'dealId': dealId
		 });
		 let options = { headers: headers };
		 return this.http.get(AppSettings.API_ENDPOINT + 'getDealById', options).map(res => <any>res);
	}
	admin_delete_deal_image(dealId,imageName) {
	   let headers = new HttpHeaders({
		  'Content-Type': 'application/json',
		  'Authorization': localStorage.getItem('token'),
		  'dealid': dealId.toString(),
		  'imagename': imageName.toString()
	   });
	   let options = { headers: headers };
	   return this.http.get(AppSettings.API_ENDPOINT + 'adminDeleteDealImage',  options).map(res => <any>res);
	}
	admin_delete_deal(dealId) {
	   let headers = new HttpHeaders({
		  'Content-Type': 'application/json',
		  'Authorization': localStorage.getItem('token'),
		  'dealid': dealId.toString()
	   });
	   let options = { headers: headers };
	   return this.http.get(AppSettings.API_ENDPOINT + 'adminDeleteDeal',  options).map(res => <any>res);
	}
	admin_change_deal_status(dealId,currentStatus) {
	   let headers = new HttpHeaders({
		  'Content-Type': 'application/json',
		  'Authorization': localStorage.getItem('token'),
		  'dealid': dealId,
		  'status': currentStatus.toString()
	   });
	   let options = { headers: headers };
	   return this.http.get(AppSettings.API_ENDPOINT + 'adminChangeDealStatus',  options).map(res => <any>res);
	}
	admin_update_deal_order(dealData) {
		   let headers = new HttpHeaders({
			 'Content-Type': 'application/json',
			 'Authorization': localStorage.getItem('token'),
		 });
		 let options = { headers: headers, method: 'post' };
		 return this.http.post(AppSettings.API_ENDPOINT + 'adminUpdateDealOrder', dealData, options).map(res => <any>res);
	}
	admin_list_invites() {
	   let headers = new HttpHeaders({
		  'Content-Type': 'application/json',
		  'Authorization': localStorage.getItem('token')
	   });
	   let options = { headers: headers };
	   return this.http.get(AppSettings.API_ENDPOINT + 'adminManageInviteUser', options).map(res => <any>res);
	}
	admin_list_reportedusers() {
	   let headers = new HttpHeaders({
		  'Content-Type': 'application/json',
		  'Authorization': localStorage.getItem('token')
	   });
	   let options = { headers: headers };
	   return this.http.get(AppSettings.API_ENDPOINT + 'adminManageReportedUser', options).map(res => <any>res);
	}
	admin_list_blockedusers() {
	   let headers = new HttpHeaders({
		  'Content-Type': 'application/json',
		  'Authorization': localStorage.getItem('token')
	   });
	   let options = { headers: headers };
	   return this.http.get(AppSettings.API_ENDPOINT + 'adminManageBlockedUser', options).map(res => <any>res);
	}
	admin_dashboard() {
	   let headers = new HttpHeaders({
		  'Content-Type': 'application/json',
		  'Authorization': localStorage.getItem('token')
	   });
	   let options = { headers: headers };
	   return this.http.get(AppSettings.API_ENDPOINT + 'adminDashboard', options).map(res => <any>res);
	}
	admin_list_users() {
	   let headers = new HttpHeaders({
		  'Content-Type': 'application/json',
		  'Authorization': localStorage.getItem('token')
	   });
	   let options = { headers: headers };
	   return this.http.get(AppSettings.API_ENDPOINT + 'adminListUser', options).map(res => <any>res);
	}
	admin_load_userById(userId) {
	   let headers = new HttpHeaders({
		   'Content-Type': 'application/json',
		   'Authorization': localStorage.getItem('token'),
		   'userid': userId
	   });
	   let options = { headers: headers };
	   return this.http.get(AppSettings.API_ENDPOINT + 'getUserById', options).map(res => <any>res);
	}
	admin_load_petsByuserId(userId) {
	   let headers = new HttpHeaders({
		   'Content-Type': 'application/json',
		   'Authorization': localStorage.getItem('token'),
		   'userid': userId
	   });
	   let options = { headers: headers };
	   return this.http.get(AppSettings.API_ENDPOINT + 'getUserPetDetail', options).map(res => <any>res);
	}

	admin_delete_user(user) {
	   let headers = new HttpHeaders({
		  'Content-Type': 'application/json',
		  'Authorization': localStorage.getItem('token'),
		  'userid': user
	   });
	   let options = { headers: headers };
	   return this.http.get(AppSettings.API_ENDPOINT + 'adminDeleteUser',  options).map(res => <any>res);
	}*/
	/*admin_change_status(user,currentStatus) {
	   let headers = new HttpHeaders({
		  'Content-Type': 'application/json',
		  'Authorization': localStorage.getItem('token'),
		  'userid': user,
		  'status': currentStatus.toString()
	   });
	   let options = { headers: headers };
	   return this.http.get(AppSettings.API_ENDPOINT + 'adminChangeStatus',  options).map(res => <any>res);
	}*/
	/* admin_load_userData(userId) {
			let headers = new HttpHeaders({
			  'Content-Type': 'application/json',
			  'Authorization': localStorage.getItem('token'),
			  'userId': userId
		  });
		  let options = { headers: headers };
		  return this.http.get(AppSettings.API_ENDPOINT + 'getUserById', options).map(res => <any>res);
	 }
	 admin_suspend_user(userData) {
			let headers = new HttpHeaders({
			  'Content-Type': 'application/json',
			  'Authorization': localStorage.getItem('token'),
		  });
		  let options = { headers: headers, method: 'post' };
		  return this.http.post(AppSettings.API_ENDPOINT + 'adminSuspendUser', userData, options).map(res => <any>res);
	 }
	 admin_list_suspended_users() {
		let headers = new HttpHeaders({
		   'Content-Type': 'application/json',
		   'Authorization': localStorage.getItem('token')
		});
		let options = { headers: headers };
		return this.http.get(AppSettings.API_ENDPOINT + 'adminListSuspendedUser', options).map(res => <any>res);
	 }
	 admin_add_traits(trait) {
		let headers = new HttpHeaders({
		   'Content-Type': 'application/json',
		   'Authorization': localStorage.getItem('token')
		});
		let options = { headers: headers, method: 'post' };
		return this.http.post(AppSettings.API_ENDPOINT + 'adminAddTrait', trait, options).map(res => <any>res);
	 }
	 admin_edit_traits(trait) {
		let headers = new HttpHeaders({
		   'Content-Type': 'application/json',
		   'Authorization': localStorage.getItem('token'),
		   'traitid': trait
		});
		let options = { headers: headers, method: 'post' };
		return this.http.post(AppSettings.API_ENDPOINT + 'adminAddTrait', trait, options).map(res => <any>res);
	 }
	 admin_delete_traits(trait) {
		let headers = new HttpHeaders({
		   'Content-Type': 'application/json',
		   'Authorization': localStorage.getItem('token'),
		   'traitid': trait
		});
		let options = { headers: headers };
		return this.http.get(AppSettings.API_ENDPOINT + 'adminDeleteTrait',  options).map(res => <any>res);
	 }
	 admin_list_traits() {
		let headers = new HttpHeaders({
		   'Content-Type': 'application/json',
		   'Authorization': localStorage.getItem('token')
		});
		let options = { headers: headers };
		return this.http.get(AppSettings.API_ENDPOINT + 'adminListTrait', options).map(res => <any>res);
	 }
	 admin_load_traitData(traitId) {
		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': localStorage.getItem('token'),
			'traitid': traitId
		});
		let options = { headers: headers };
		return this.http.get(AppSettings.API_ENDPOINT + 'getTraitById', options).map(res => <any>res);
	 }
	 admin_list_feedbacks() {
		let headers = new HttpHeaders({
		   'Content-Type': 'application/json',
		   'Authorization': localStorage.getItem('token')
		});
		let options = { headers: headers };
		return this.http.get(AppSettings.API_ENDPOINT + 'adminListFeedbacks', options).map(res => <any>res);
	 }
	 admin_filterdata(user) {
		let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
		let options = { headers: headers, method: 'post' };
		return this.http.post(AppSettings.API_ENDPOINT + 'adminFilterUsers', user, options).map(res => <any>res);
	 }
	  admin_downloaddata(user) {
		let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
		let options = { headers: headers, method: 'post' };
		return this.http.post(AppSettings.API_ENDPOINT + 'adminDownloadData', user, options).map(res => <any>res);
	 } */
}
