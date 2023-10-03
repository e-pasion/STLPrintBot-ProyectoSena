import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './components/client/auth/auth.component';
import { AuthInterceptor } from './services/authInterceptor/auth.interceptor';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { HomeComponent } from './components/client/home/home.component';
import { NavbarComponent } from './components/client/navbar/navbar.component';
import { ProfileComponent } from './components/client/profile/profile.component';
import { NavbarSideComponent } from './components/dashboard/navbar-side/navbar-side.component';
import { CalculatorComponent } from './components/client/calculator/calculator.component';
import { CartComponent } from './components/client/cart/cart.component';
import { CheckoutComponent } from './components/client/checkout/checkout.component';
import { ColorComponent } from './components/dashboard/color/color.component';
import { CodeComponent } from './components/dashboard/code/code.component';
import { PriceComponent } from './components/dashboard/price/price.component';
import { OrderComponent } from './components/dashboard/order/order.component';
import { CreateColorComponent } from './components/dashboard/color/create-color/create-color.component'
import { ServicesComponent } from './components/client/services/services.component';
import { ContactUsComponent } from './components/client/contact-us/contact-us.component'




@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    UnauthorizedComponent,
    HomeComponent,
    NavbarComponent,
    ProfileComponent,
    NavbarSideComponent,
    CalculatorComponent,
    CartComponent,
    CheckoutComponent,
    ColorComponent,
    CodeComponent,
    PriceComponent,
    OrderComponent,
    CreateColorComponent,
    ServicesComponent,
    ContactUsComponent
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule
    ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
