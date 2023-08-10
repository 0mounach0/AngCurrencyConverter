import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ExchangeComponent } from './components/exchange/exchange.component';
import { ExchangeRateService } from './services/exchange-rate.service';
import { FormsModule } from '@angular/forms';
import { CurrencySwitchDirective } from './directives/currency-switch.directive';

@NgModule({
  declarations: [
    AppComponent,
    ExchangeComponent,
    CurrencySwitchDirective
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [ExchangeRateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
