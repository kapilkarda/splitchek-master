import { Component, OnInit, ElementRef, Inject } from '@angular/core';
import { Router, ActivatedRoute, Params, Data } from '@angular/router';
import { NgForm } from '@angular/forms';
import { DOCUMENT } from '@angular/common';
import * as $ from 'jquery';

@Component({
   selector: 'adminsidebar',
   templateUrl: './adminsidebar.html',
})

export class adminsidebarComponent implements OnInit{
   model: any = {};
	
	constructor(
   	private elementRef: ElementRef,
		@Inject(DOCUMENT) 
		private doc 
   ) { }
	
	ngOnInit() { }
}