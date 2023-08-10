import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ExchangeComponent } from './components/exchange/exchange.component';
import { HistoryComponent } from './components/history/history.component';
import { ExchangeRateService } from './services/exchange-rate.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ExchangeComponent,
    HistoryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [ExchangeRateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
