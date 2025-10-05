import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';


import {
  ChartComponent
} from "ng-apexcharts";
import { PieChartService } from './pieChart.service';

@Component({
  selector: 'app-pie-chart',
  imports: [
    CommonModule,
    ChartComponent
  ],
  standalone: true,
  templateUrl: './pieChart.component.html',
  styleUrl: './pieChart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PieChartComponent { 

  private pieCharService = inject(PieChartService);


  public chartOptions = this.pieCharService.chartOptions;

}
