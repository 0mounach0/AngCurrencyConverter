import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ExchangeComponent } from './components/exchange/exchange.component';
import { HistoryComponent } from './components/history/history.component';
import { ExchangeRateService } from './services/exchange-rate.service';

@NgModule({
  declarations: [
    AppComponent,
    ExchangeComponent,
    HistoryComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [ExchangeRateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
