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
        this.forcedExchangeRate = null;
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
    }, 3000);
  }

  public toggleCurrency(isEurEntry: boolean) {
    if (isEurEntry) {
      this.amount = this.prevAmountToEUR;
    } else {
      this.amount = this.prevAmountToUSD;
    }

    this.prevCurrencyFrom = this.currencyFrom;
    this.prevCurrencyTo = this.currencyTo;

    this.amount = Math.round(this.amount * 100) / 100;
    this.exchangeRate = this.forcedExchangeRate !== null ? this.forcedExchangeRate : this.realExchangeRate;

    this.currencyFrom = isEurEntry ? Currency.EUR : Currency.USD;
    this.currencyTo = isEurEntry ? Currency.USD : Currency.EUR;
    this.convertCurrency();
  }

  public convertCurrency() {
    const result = this.exchangeRateService.convertCurrency(this.amount, this.currencyFrom, this.currencyTo);
    this.convertedAmount = result !== null ? result : 0;
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
