import { Component, OnInit } from '@angular/core';
import { ExchangeRateService } from 'src/app/services/exchange-rate.service';

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.scss']
})
export class ExchangeComponent implements OnInit {
  public exchangeRate: number = 0;

  constructor(private exchangeRateService: ExchangeRateService) {}

  ngOnInit() {
    this.exchangeRate = this.exchangeRateService.currentExchangeRate;
    setInterval(() => {
      this.exchangeRateService.updateExchangeRate();
      this.exchangeRate = this.exchangeRateService.currentExchangeRate;
    }, 3000);
  }

}
