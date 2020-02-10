import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params, Data } from '@angular/router';
import { NgForm } from '@angular/forms';
//import { NotificationsService } from '../../services/notifications.service';
import { NgxSpinnerService } from 'ngx-spinner';
//import { AdminServices } from '../../services/admin.service';
//import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'adminheader',
    templateUrl: './adminheader.html',
})

export class adminheaderComponent {
    model: any = {};
    //email: any;
    //first_name: string;
    //last_name: string;
    //name: string;
    //subscription: Subscription;
    //data: any;
    //adminData: any;

    constructor(
        private router: Router,
        //private activatedRoute: ActivatedRoute,
        //private notificationsService: NotificationsService,
        //private adminService: AdminServices
        //private spinner: NgxSpinnerService
    ) 
    {
        //this.getAdminAccount();
        //this.subscribeToNotifications();
    }

    /*ngOnInit() { }*/

    /*getAdminAccount() {
        this.adminService.get_admin_account().subscribe(adminData => {
            this.adminData = adminData;
            if (adminData.status === 'success') {
                this.email = adminData.data.email;
                this.first_name = adminData.data.first_name;
                this.last_name = adminData.data.last_name;
                //this.name = adminData.data.first_name.charAt(0) + adminData.data.last_name.charAt(0);
                localStorage.setItem('email', adminData.data.email);
                localStorage.setItem('first_name', adminData.data.first_name);
                localStorage.setItem('last_name', adminData.data.last_name);
            } else {
                this.notificationsService.notify('error', 'Failure', adminData.message);
                if (adminData.message === 'Token mismatched') {
                    this.notificationsService.handleTokenError();
                    this.spinner.hide();
                }
            }
        });
    }*/


    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        this.router.navigate(['/']);
    }

    /*subscribeToNotifications() {
        this.subscription = this.notificationsService.dataChange.subscribe(notification => {
            this.data = notification;
            if (notification !== null && notification !== undefined && notification !== '') {
                this.first_name = this.data.first_name;
                this.last_name = this.data.last_name;
                this.email = this.data.email;
                this.name = this.data.first_name.charAt(0) + this.data.last_name.charAt(0);
                localStorage.setItem('email', this.data.email);

                localStorage.setItem('first_name', this.data.first_name);
                localStorage.setItem('last_name', this.data.last_name);
                localStorage.setItem('name', this.data.first_name.charAt(0) + this.data.last_name.charAt(0));

            }
        });
    }*/

    /*navbar_toggle() {
        $('.navbar-collapse.collapse.in, .navbar-collapse.collapse').css('display', 'none');
        $('.navbar-collapse.collapse.in, .navbar-collapse.collapse').css('height', '0');

        $('.sidebar').toggleClass('slide');
    }*/
}


