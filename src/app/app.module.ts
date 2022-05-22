import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {HttpClientModule} from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    AboutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    MatSnackBarModule,
  ],
  providers: [
    {
      provide: 'apiUrl',   //  her service için ayrıca tanımlamamak için buraya yazmak işin kısayolu, sonra service içinde @inject ile çağrılabilir.
      useValue: 'https://demo.limantech.com/cards/public/api'  // https://gatesopenresearch.org/extapi   open source api data edit için dene!
    },                                                         // apiUrl: string = 'https://jsonplaceholder.typicode.com' +'/users'  bu da kullanılabilir
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
