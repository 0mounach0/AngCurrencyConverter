import { Injectable } from '@angular/core';
import { Currency } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class ExchangeRateService {
  private exchangeRate: number = 1.1;

  constructor() { }

  public get currentExchangeRate(): number {
    return this.exchangeRate;
  }

  public updateExchangeRate() {
    const randomVariation = (Math.random() * 0.1) - 0.05;
    this.exchangeRate += randomVariation;
  }

  public convertCurrency(amount: number, fromCurrency: Currency, toCurrency: Currency): number | null {
    const rateToUse = this.currentExchangeRate;

    if (amount !== null) {
      if (fromCurrency === Currency.EUR) {
        return toCurrency === Currency.USD ? amount * rateToUse : amount / rateToUse;
      } else {
        return toCurrency === Currency.USD ? amount / rateToUse : amount * rateToUse;
      }
    }

    return null;
  }
}
