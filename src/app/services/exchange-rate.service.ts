import { Injectable } from '@angular/core';

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
}
