import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule } from './app-routing.module';
import {MessageService} from 'primeng/api';
import {AppComponent} from './app.component';
import {AdminModule} from './admin/admin.module';
import {DatePipe} from '@angular/common';
import {CustomFormsModule} from 'ng2-validation'
import {NgxSpinnerModule} from 'ngx-spinner';
import {ToastModule} from 'primeng/toast';
import {TableModule} from 'primeng/table';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {CalendarModule} from 'primeng/calendar';
import {ConfirmationService} from 'primeng/api';
import {TreeviewModule} from 'ngx-treeview';
import { NgSelect2Module } from 'ng-select2';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AdminModule,
    AppRoutingModule,
    NgxSpinnerModule,
    NgSelect2Module,
    TableModule,
    ToastModule,
	TreeviewModule.forRoot()
  ],
  providers: [MessageService,ConfirmationService,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
