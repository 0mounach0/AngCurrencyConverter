import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-history-table',
  templateUrl: './history-table.component.html',
  styleUrls: ['./history-table.component.scss']
})
export class HistoryTableComponent implements OnInit {
  @Input() conversionHistory!: any[];

  constructor() { }

  ngOnInit(): void {
  }

}
