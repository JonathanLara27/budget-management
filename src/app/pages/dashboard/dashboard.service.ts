import { computed, Injectable, signal } from '@angular/core';
import { ChartOptions } from 'src/app/common/interfaces';

@Injectable()
export class DashboardService {

  private chartOptionsSignal = signal<Partial<ChartOptions>>({});
  public chartOptions = computed(() => this.chartOptionsSignal());
  
  constructor() { 
    this.setChartOptions({
      series: [44, 55, 13], // ejemplo: Gastos por categoría
      chart: {
        type: 'pie',
        width: '100%',
      },
      labels: ['Comida', 'Transporte', 'Ocio'],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: '100%',
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    });
  }

  public setChartOptions(options: Partial<ChartOptions>) {
    this.chartOptionsSignal.set(options);
  }



}
