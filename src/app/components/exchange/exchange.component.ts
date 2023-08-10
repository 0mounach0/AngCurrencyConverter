import { Component, OnInit } from '@angular/core';
import { Currency } from 'src/app/app.component';
import { ExchangeRateService } from 'src/app/services/exchange-rate.service';

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.scss']
})
export class ExchangeComponent implements OnInit {
  public exchangeRate: number = 0;
  /* // previous questions
  public eurAmount: number = 0;
  public usdAmount: number | null = null;
  */
  public Currency = Currency;
  public amount: number = 0;
  public currencyFrom: Currency = Currency.EUR;
  public currencyTo: Currency = Currency.USD;
  public convertedAmount: number | null = null;

  public prevAmountToUSD: number = 0;
  public prevAmountToEUR: number = 0;
  public prevCurrencyFrom: Currency = Currency.EUR;
  public prevCurrencyTo: Currency = Currency.USD;

  constructor(private exchangeRateService: ExchangeRateService) {}

  ngOnInit() {
    this.exchangeRate = this.exchangeRateService.currentExchangeRate;

    setInterval(() => {
      this.exchangeRateService.updateExchangeRate();
      this.exchangeRate = this.exchangeRateService.currentExchangeRate;

      this.convertCurrency();

      if (this.currencyFrom === Currency.EUR) {
        this.prevAmountToUSD = this.convertedAmount || this.prevAmountToUSD;
      } else {
        this.prevAmountToEUR = this.convertedAmount || this.prevAmountToEUR;
      }

      this.prevCurrencyFrom = this.currencyFrom;
      this.prevCurrencyTo = this.currencyTo;

      /* // previous questions 
      if (this.eurAmount !== null) {
        this.usdAmount = this.eurAmount * this.exchangeRateService.currentExchangeRate;
      } */
    }, 3000);
  }

  /* / previous questions  
    public convertToUSD() {
    this.usdAmount = this.eurAmount * this.exchangeRateService.currentExchangeRate;
  } */

  public toggleCurrency(isEurEntry: boolean) {
    if (isEurEntry) {
      this.amount = this.prevAmountToEUR;
    } else {
      this.amount = this.prevAmountToUSD;
    }

    this.prevCurrencyFrom = this.currencyFrom;
    this.prevCurrencyTo = this.currencyTo;

    this.amount = Math.round(this.amount * 100) / 100; // Limit to 2 decimal places

    this.currencyFrom = isEurEntry ? Currency.EUR : Currency.USD;
    this.currencyTo = isEurEntry ? Currency.USD : Currency.EUR;
    this.convertCurrency();
  }

  public convertCurrency() {
    if (this.amount !== null) {
      if (this.currencyFrom === Currency.EUR) {
        this.convertedAmount = this.amount * this.exchangeRateService.currentExchangeRate;
      } else {
        this.convertedAmount = this.amount / this.exchangeRateService.currentExchangeRate;
      }
    }
  }

}
