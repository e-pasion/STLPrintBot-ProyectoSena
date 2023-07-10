import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './client/home/home.component';
import { NavbarComponent } from './client/navbar/navbar.component';
import { CalculatorComponent } from './client/calculator/calculator.component';
import { AuthComponent } from './client/auth/auth.component';
import { CartComponent } from './client/cart/cart.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    CalculatorComponent,
    AuthComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
