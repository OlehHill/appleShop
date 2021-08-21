import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; 
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { IphoneComponent } from './pages/iphone/iphone.component';
import { IpadComponent } from './pages/ipad/ipad.component';
import { MacComponent } from './pages/mac/mac.component';
import { WatchComponent } from './pages/watch/watch.component';
import { GadgetsComponent } from './pages/gadgets/gadgets.component';
import { AccessoriesComponent } from './pages/accessories/accessories.component';
import { BasketComponent } from './pages/basket/basket.component';
import { AdminComponent } from './admin/admin.component';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdminProductComponent } from './admin/admin-product/admin-product.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../environments/environment';
import { ProductComponent } from './pages/product/product.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';





@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    IphoneComponent,
    IpadComponent,
    MacComponent,
    WatchComponent,
    GadgetsComponent,
    AccessoriesComponent,
    BasketComponent,
    AdminComponent,
    AdminCategoryComponent,
    AdminProductComponent,
    ProductComponent,
    ProductDetailsComponent,
  



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
