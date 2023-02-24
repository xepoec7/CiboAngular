import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardModule } from './components/board/board.module';
import { CartModule } from './components/cart/cart.module';
import { DetailsModule } from './components/details/details.module';
import { HeaderComponent } from './components/_shared/nav.component';
import ApiService from './services/api.service';
import { CartService } from './services/cart.service';
import { LocalStorageService, StorageService } from './services/storage.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BoardModule,
    DetailsModule,
    CartModule,
  ],
  providers: [ApiService, CartService, LocalStorageService,
  { provide: StorageService, useClass: LocalStorageService}],
  bootstrap: [AppComponent]
})
export class AppModule { }
