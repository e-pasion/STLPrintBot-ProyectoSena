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
import { NavbarTopComponent } from './components/dashboard/navbar-top/navbar-top.component';
import { NavbarSideComponent } from './components/dashboard/navbar-side/navbar-side.component';
import { CreateColorComponent } from './components/dashboard/color/create-color/create-color.component';
import { CalculatorComponent } from './components/client/calculator/calculator.component';
import { CartComponent } from './components/client/cart/cart.component';
import { CheckoutComponent } from './components/client/checkout/checkout.component';
import { FooterComponent } from './components/client/footer/footer.component';
import { DataTablesModule } from 'angular-datatables';
import { EmployeeComponent } from './components/dashboard/employee/employee.component';
import { EditProfileComponent } from './components/client/edit-profile/edit-profile.component'




@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    UnauthorizedComponent,
    HomeComponent,
    NavbarComponent,
    ProfileComponent,
    NavbarTopComponent,
    NavbarSideComponent,
    CreateColorComponent,
    CalculatorComponent,
    CartComponent,
    CheckoutComponent,
    FooterComponent,
    EmployeeComponent,
    EditProfileComponent
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    DataTablesModule
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
