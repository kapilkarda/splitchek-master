import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
	selector:'admin',
	templateUrl:'./admin.html',
	styleUrls: ['./admin.css']
})

export class adminComponent implements OnInit {
	userToken:any;
	constructor(private router: Router, private route: ActivatedRoute){}
	isLoginPage() {  
    	if (this.router.url == '/admin' || this.router.url == '/admin/forgotpassword') { 
    		return false; 
    	} else{ 
    		return true; 
    	}
	}
	
	ngOnInit(){
		this.userToken=localStorage.getItem('token');  
        if(this.userToken == null){
            this.router.navigate(['/admin']);    
        }
	}
}