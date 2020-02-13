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
    TableModule
  ],
  providers: [MessageService,ConfirmationService,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }