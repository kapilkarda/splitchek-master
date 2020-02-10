import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { adminloginComponent } from './admin/admin_login/adminlogin.component';

const routes: Routes = [
  { path: '', component: adminloginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
