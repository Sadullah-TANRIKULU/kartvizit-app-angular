import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {
  path:'',
  component: HomeComponent
  },
  {
    path:'about',
    component: AboutComponent
  },
  { path: 'cards', loadChildren: () => import('./cards/cards.module').then(m => m.CardsModule) }  // lazy loading, tıklayınca yüklenen module, console/network/js sekmesi altında sayfayı refresh edip kartvizitlere tıklayınca yeni modulün geldiği görünüyor.
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
