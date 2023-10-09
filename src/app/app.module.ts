import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ExchangeComponent } from './components/exchange/exchange.component';
import { ExchangeRateService } from './services/exchange-rate.service';
import { FormsModule } from '@angular/forms';
import { CurrencySwitchDirective } from './directives/currency-switch.directive';
import { ConversionComponent } from './components/conversion/conversion.component';
import { HistoryTableComponent } from './components/history-table/history-table.component';

@NgModule({
  declarations: [
    AppComponent,
    ExchangeComponent,
    CurrencySwitchDirective,
    ConversionComponent,
    HistoryTableComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [ExchangeRateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
