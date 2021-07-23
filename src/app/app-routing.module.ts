import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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




const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'iphone', component: IphoneComponent },
  { path: 'ipad', component: IpadComponent },
  { path: 'mac', component: MacComponent },
  { path: 'watch', component: WatchComponent },
  { path: 'gadgets', component: GadgetsComponent },
  { path: 'accessories', component: AccessoriesComponent },
  { path: 'basket', component: BasketComponent },
  { path: 'admin', component: AdminComponent, children: [
      { path: '', pathMatch: 'full', redirectTo: 'home' },
      { path: 'category', component: AdminCategoryComponent },
      { path: 'product', component: AdminProductComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
