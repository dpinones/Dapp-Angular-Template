import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './ui/account/account.component';

const routes: Routes = [
  { path: "", redirectTo: "account", pathMatch: "full" },
  { path: "account", component: AccountComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
