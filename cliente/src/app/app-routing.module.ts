import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/client/auth/auth.component';
import { HomeComponent } from './components/client/home/home.component';
import { adminGuard } from './shared/guard/admin-guard/admin.guard';
import { authGuard } from './shared/guard/auth-guard/auth.guard';
import { clientGuard } from './shared/guard/client-guard/client.guard';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { ProfileComponent } from './components/client/profile/profile.component';
import { CalculatorComponent } from './components/client/calculator/calculator.component';
import { CartComponent } from './components/client/cart/cart.component';
import { CheckoutComponent } from './components/client/checkout/checkout.component';
import { ColorComponent } from './components/dashboard/color/color.component';
import { CodeComponent } from './components/dashboard/code/code.component';
import { PriceComponent } from './components/dashboard/price/price.component';
import { OrderComponent } from './components/dashboard/order/order.component';
import { CreateColorComponent } from './components/dashboard/color/create-color/create-color.component';
import { ServicesComponent } from './components/client/services/services.component';
import { ContactUsComponent } from './components/client/contact-us/contact-us.component';

const routes: Routes = [
  //client
  {path:"",component:HomeComponent},
  {path:"auth",component:AuthComponent},
  {path:"profile",canActivate:[authGuard,clientGuard],component:ProfileComponent},
  {path:"cotizator",component:CalculatorComponent},
  {path:'services',component:ServicesComponent},
  {path:"cart",component:CartComponent},
  {path:"checkout",canActivate:[authGuard,clientGuard],component:CheckoutComponent},
  {path:"contactus",component:ContactUsComponent},

  //dashboard
  {path:"dashboard/color",canActivate:[authGuard,adminGuard],component:ColorComponent},
  {path:"dashboard/color/create",canActivate:[authGuard,adminGuard],component:CreateColorComponent},
  {path:"dashboard/color/edit/:id",canActivate:[authGuard,adminGuard],component:CreateColorComponent},
  {path:"dashboard/code",canActivate:[authGuard,adminGuard],component:CodeComponent},
  {path:"dashboard/price",canActivate:[authGuard,adminGuard],component:PriceComponent},
  {path:"dashboard/order",canActivate:[authGuard,adminGuard],component:OrderComponent},

  //messages
  {path:"unauthorized",component:UnauthorizedComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
