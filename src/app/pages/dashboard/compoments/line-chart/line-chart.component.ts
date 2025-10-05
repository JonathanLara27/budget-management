import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LineChartService } from './line-chart.service';
import { ChartComponent } from 'ng-apexcharts';

@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [
    CommonModule,
    ChartComponent,
  ],
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LineChartComponent {

  private lineChartService = inject(LineChartService);

  public chartOptions = this.lineChartService.chartOptions;

}
