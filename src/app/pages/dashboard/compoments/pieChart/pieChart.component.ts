import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input, signal, ViewChild } from '@angular/core';


import {
  ChartComponent
} from "ng-apexcharts";
import { ChartOptions } from 'src/app/common/interfaces';

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

  // public chartOptions = input.required<Partial<ChartOptions>>();

  transactions = signal([
    { amount: 150, category: 'Comida' },
    { amount: 200, category: 'Transporte' },
    { amount: 100, category: 'Comida' },
    { amount: 50, category: 'Ocio' },
    { amount: 25, category: null }, // sin categoría -> se normaliza abajo
  ]);

  // Computed que agrupa por categoría y devuelve un array ordenado por total descendente
  categoryTotals = computed(() => {
    const map = new Map<string, number>();
    for (const t of this.transactions()) {
      const cat = (t.category ?? 'Sin categoría').trim() || 'Sin categoría';
      map.set(cat, (map.get(cat) ?? 0) + t.amount);
    }

    // convertir a array y ordenar
    const arr = Array.from(map.entries()).map(([category, total]) => ({ category, total }));
    arr.sort((a, b) => b.total - a.total);
    return arr;
  });

  // Labels y Series (signals derivados)
  labels = computed(() => this.categoryTotals().map(x => x.category));
  series = computed(() => this.categoryTotals().map(x => x.total));

  chartOptions = computed<Partial<ChartOptions>>(() => ({
    series: this.series(),
    chart: {
      type: 'pie',
      width: 400, // ancho fijo máximo
    },
    labels: this.labels(),
    responsive: [
      {
        breakpoint: 1200, // pantallas grandes
        options: {
          chart: { width: 400 }, // límite en escritorio
          legend: { position: 'right' },
        },
      },
      {
        breakpoint: 768, // tablets
        options: {
          chart: { width: 300 },
          legend: { position: 'bottom' },
        },
      },
      {
        breakpoint: 480, // móviles
        options: {
          chart: { width: '100%' },
          legend: { position: 'bottom' },
        },
      },
    ],
  }));



  // Ejemplo: agregar un gasto (la señal actualizará el gráfico automáticamente)
  addExpense(amount: number, category?: string) {
    const normalizedCategory = (category ?? 'Sin categoría').trim() || 'Sin categoría';
    this.transactions.update(list => [...list, { amount, category: normalizedCategory }]);
  }

  // Ejemplo de uso: eliminar el último gasto
  removeLast() {
    this.transactions.update(list => list.slice(0, -1));
  }

}
