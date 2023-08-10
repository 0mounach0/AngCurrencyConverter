import { Component, OnInit } from '@angular/core';
import { ExchangeRateService } from 'src/app/services/exchange-rate.service';

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.scss']
})
export class ExchangeComponent implements OnInit {
  public exchangeRate: number = 0;
  public eurAmount: number = 0;
  public usdAmount: number | null = null;

  constructor(private exchangeRateService: ExchangeRateService) {}

  ngOnInit() {
    this.exchangeRate = this.exchangeRateService.currentExchangeRate;
    setInterval(() => {
      this.exchangeRateService.updateExchangeRate();
      this.exchangeRate = this.exchangeRateService.currentExchangeRate;
      if (this.eurAmount !== null) {
        this.usdAmount = this.eurAmount * this.exchangeRateService.currentExchangeRate;
      }
    }, 3000);
  }

  public convertToUSD() {
    this.usdAmount = this.eurAmount * this.exchangeRateService.currentExchangeRate;
  }

}
