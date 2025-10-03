import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, input, signal, ViewChild } from '@angular/core';


import {
  ChartComponent
} from "ng-apexcharts";
import { ChartOptions, Transaction } from 'src/app/common/interfaces';
import { PieChartService } from './pieChart.service';

@Component({
  selector: 'app-pie-chart',
  imports: [
    CommonModule,
    ChartComponent
  ],
  providers: [
    PieChartService
  ],
  standalone: true,
  templateUrl: './pieChart.component.html',
  styleUrl: './pieChart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PieChartComponent { 

  private pieCharService = inject(PieChartService);

  public transactions = input.required<Transaction[]>();

  public chartOptions = this.pieCharService.chartOptions;

  ngOnInit(): void {
    this.pieCharService.setExpenses(this.transactions());
  }

}
