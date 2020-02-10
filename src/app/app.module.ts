import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {DatePipe} from '@angular/common';
import {CustomFormsModule} from 'ng2-validation'
import {NgxSpinnerModule} from 'ngx-spinner';
import {ToastModule} from 'primeng/toast';
import {TableModule} from 'primeng/table';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {CalendarModule} from 'primeng/calendar';
import {ConfirmationService} from 'primeng/api';
import {MessageService} from 'primeng/api';
import {AppRoutingModule } from './app-routing.module';
import {AppComponent} from './app.component';
import {AdminModule} from './admin/admin.module';

@NgModule({
	declarations: [
   	AppComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpClientModule,
		CustomFormsModule,
		NgxSpinnerModule,
		ToastModule,
		TableModule,
		ConfirmDialogModule,
		CalendarModule,
		AppRoutingModule,
    	AdminModule
   ],
	providers: [MessageService,ConfirmationService,DatePipe],
	bootstrap: [AppComponent]
})
export class AppModule { }