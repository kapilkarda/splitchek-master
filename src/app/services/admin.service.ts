import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import {AppSettings} from '../../../appSettings';
import 'rxjs/add/operator/map';

@Injectable()
export class AdminService {
   constructor(private http: HttpClient) { }
   admin_login(user) {
      let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      let options = { headers: headers, method: 'post' };
      return this.http.post(AppSettings.API_ENDPOINT + 'adminLogin', user, options).map(res => <any>res);
   }
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
   
   admin_delete_user(user) { 
      let headers = new HttpHeaders({
         'Content-Type': 'application/json',
         'Authorization': localStorage.getItem('token'),
         'userid': user
      });
      let options = { headers: headers };
      return this.http.get(AppSettings.API_ENDPOINT + 'adminDeleteUser',  options).map(res => <any>res);
   }
   admin_change_status(user,currentStatus) { 
      let headers = new HttpHeaders({
         'Content-Type': 'application/json',
         'Authorization': localStorage.getItem('token'),
         'userid': user,
         'status': currentStatus.toString()
      });
      let options = { headers: headers };
      return this.http.get(AppSettings.API_ENDPOINT + 'adminChangeStatus',  options).map(res => <any>res);
   }
   admin_load_userData(userId) { 
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
}
