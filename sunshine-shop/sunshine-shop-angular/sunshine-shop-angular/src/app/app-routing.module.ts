import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { from } from 'rxjs';
import { HomeComponent } from './layout/home/home.component';
import { LoginComponent } from './routes/navbar/login/login.component';
import { SignUpComponent } from './routes/navbar/sign-up/sign-up.component';
import { CartComponent } from './routes/navbar/cart/cart.component';
import { CategoryComponent } from './routes/navbar/category/category.component'
import { OnSaleComponent } from './routes/navbar/on-sale/on-sale.component'
import { OnlineOnlyComponent } from './routes/navbar/online-only/online-only.component'
import { ProductListComponent } from "./layout/home/product-list/product-list.component";
import { SubProductListComponent } from "./layout/home/sub-product-list/sub-product-list.component";


const routes: Routes = [
  // if path matches, show those component
  { path: "", component: HomeComponent, pathMatch: "full" },
  { path: "home", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: SignUpComponent },
  { path: "cart", component: CartComponent },

  // for category funtion routes
  { path: "category/:id", component: ProductListComponent},
  { path: "category/sub/:id", component: SubProductListComponent},
  { path: "category", component: CategoryComponent},
  { path: "", redirectTo:"/home", pathMatch: "full"},
  { path: "**", redirectTo:"/home", pathMatch: "full"},

  { path: "onsale", component: OnSaleComponent },
  { path: "online-shop", component: OnlineOnlyComponent }
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
