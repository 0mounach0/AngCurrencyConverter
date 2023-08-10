import { Directive, Output, HostBinding, EventEmitter, HostListener } from '@angular/core';

@Directive({
  selector: '[appCurrencySwitch]'
})
export class CurrencySwitchDirective {
  @Output() currencyChanged = new EventEmitter<boolean>();
  @HostBinding('class') class = 'switch';
  isChecked: boolean = true;

  @HostListener('click') toggleSwitch() {
    this.isChecked = !this.isChecked;
    this.currencyChanged.emit(this.isChecked);
  }

}
