import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { ProductsComponent } from './components/products/products.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AddProductsComponent } from './components/products/add-products/add-products.component';
import { UpdateProductComponent } from './components/products/update-product/update-product.component';
import { ExploreUsComponent } from './components/explore-us/explore-us.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { roleBasedGuard } from './guard/role-based.guard';
import { NotAuthorizedComponent } from './components/not-authorized/not-authorized.component';

const routes: Routes = [
  {path:'',redirectTo:'/home',pathMatch:"full"},
  {path:'home',component:NavbarComponent,children:[
    {path:'',component:HomeComponent},
    {path:'products',component:ProductsComponent},

    { 
      path:'add-product',
      component:AddProductsComponent,
      canActivate:[roleBasedGuard],
      data:{role:"ROLE_ADMIN"}
    },

    {
      path:'update-product/:id',
      component:UpdateProductComponent,
      canActivate:[roleBasedGuard],
      data:{role:"ROLE_ADMIN"}
    },


    {path:'explore-us',component:ExploreUsComponent},
    {path:'about-us',component:AboutUsComponent},
  ]},
  {path:'not-authorized',component:NotAuthorizedComponent},
  {path:'signup',component:SignupComponent},
  {path:'login',component:LoginComponent},
  {path:'**', component:NotFoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:false})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
