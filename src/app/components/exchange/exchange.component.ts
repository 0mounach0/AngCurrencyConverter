import { Component, OnInit } from '@angular/core';
import { Currency } from 'src/app/app.component';
import { ExchangeRateService } from 'src/app/services/exchange-rate.service';

interface ConversionHistory {
  realRate: number;
  enteredRate: number;
  initialAmount: number;
  initialCurrency: Currency;
  calculatedAmount: number;
  calculatedCurrency: Currency;
}

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
  public convertedAmount!: number;

  public prevAmountToUSD: number = 0;
  public prevAmountToEUR: number = 0;
  public prevCurrencyFrom: Currency = Currency.EUR;
  public prevCurrencyTo: Currency = Currency.USD;

  public forcedExchangeRate: number | null = null;
  public realExchangeRate: number = 0;
  public conversionHistory: ConversionHistory[] = [];

  constructor(private exchangeRateService: ExchangeRateService) {}

  ngOnInit() {
    this.exchangeRate = this.exchangeRateService.currentExchangeRate;

    setInterval(() => {
      this.exchangeRateService.updateExchangeRate();
      this.realExchangeRate = this.exchangeRateService.currentExchangeRate;

      if (
        this.forcedExchangeRate !== null &&
        Math.abs(this.forcedExchangeRate - this.realExchangeRate) / this.realExchangeRate > 0.02
      ) {
        console.log(Math.abs(this.forcedExchangeRate - this.realExchangeRate) / this.realExchangeRate)
        this.forcedExchangeRate = null; // Disable fixed rate due to significant variation
      }

      this.exchangeRate = this.forcedExchangeRate !== null ? this.forcedExchangeRate : this.realExchangeRate;

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
    this.exchangeRate = this.forcedExchangeRate !== null ? this.forcedExchangeRate : this.realExchangeRate;

    this.currencyFrom = isEurEntry ? Currency.EUR : Currency.USD;
    this.currencyTo = isEurEntry ? Currency.USD : Currency.EUR;
    this.convertCurrency();
  }

  public convertCurrency() {
    if (this.amount !== null) {
      const rateToUse = this.forcedExchangeRate !== null ? this.forcedExchangeRate : this.exchangeRateService.currentExchangeRate;

      if (this.currencyFrom === Currency.EUR) {
        this.convertedAmount = this.amount * rateToUse;
      } else {
        this.convertedAmount = this.amount / rateToUse;
      }
    }
  }

  public updateConversionHistory() {
    const rateToUse = this.forcedExchangeRate !== null ? this.forcedExchangeRate : this.exchangeRateService.currentExchangeRate;

    const historyEntry: ConversionHistory = {
      realRate: this.realExchangeRate,
      enteredRate: rateToUse,
      initialAmount: this.amount,
      initialCurrency: this.currencyFrom,
      calculatedAmount: this.convertedAmount,
      calculatedCurrency: this.currencyTo
    };

    this.conversionHistory.unshift(historyEntry);

    if (this.conversionHistory.length > 5) {
      this.conversionHistory.pop();
    }
  }

}
