import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule } from './app-routing.module';
import {MessageService, DialogService, DynamicDialogRef} from 'primeng/api';
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
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { AuthGuardService } from './services/auth-guard.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AdminModule,
    AppRoutingModule,
    NzTreeModule,
    NgxSpinnerModule,
    NgSelect2Module,
    TableModule,
    ToastModule,
	TreeviewModule.forRoot()
  ],
  providers: [MessageService,ConfirmationService,DatePipe,DialogService,DynamicDialogRef,{ provide: AuthGuardService, useClass: AuthGuardService }],
  bootstrap: [AppComponent]
})
export class AppModule { }
