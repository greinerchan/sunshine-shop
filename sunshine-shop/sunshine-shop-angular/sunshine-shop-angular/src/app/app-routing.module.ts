import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { from } from 'rxjs';
import {HomeComponent} from './layout/home/home.component';
import {LoginComponent} from './routes/navbar/login/login.component';
import {SignUpComponent} from './routes/navbar/sign-up/sign-up.component';
import {CartComponent} from './routes/navbar/cart/cart.component';

const routes: Routes = [
  // if path matches, show those component
  {path:"home", component:HomeComponent, pathMatch:"full"},
  {path:"login", component:LoginComponent},
  {path:"register", component:SignUpComponent},
  {path:"cart", component:CartComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


// export const AppRoutes: Routes = [
//   { path: '**',  loadChildren: './layout/layout.module#LayoutModule', pathMatch: 'full' }
// ];

// @NgModule({
//   imports: [ RouterModule.forRoot(AppRoutes) ],
//   exports: [ RouterModule ]
// })
// export class AppRoutingModule {}
