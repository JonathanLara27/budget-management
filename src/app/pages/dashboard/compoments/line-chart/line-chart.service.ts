import { Injectable, computed, signal } from '@angular/core';
import { ChartOptionsLine, Transaction } from 'src/app/common/interfaces';

@Injectable({
  providedIn: 'root'
})
export class LineChartService {

  private incomeTransactions = signal<Transaction[]>([]);

  public icomes = computed(() => this.incomeTransactions());

  private dateTotals = computed(() => {
    const map = new Map<string, number>();
    const transactions = this.incomeTransactions();

    transactions.forEach(t => {
      const date = new Date(t.date).toLocaleDateString(); // Formatear la fecha
      const current = map.get(date) ?? 0;
      map.set(date, +(current + t.amount).toFixed(2)); // 👈 aquí aplicas el redondeo
    });

    // convertir a array y ordenar por fecha
    const arr = Array.from(map.entries())
      .map(([date, total]) => ({ date, total: +total.toFixed(2) })) // 👈 seguridad extra
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    return arr;

  });

  private labels = computed(() => this.dateTotals().map(x => x.date));
  private series = computed(() => this.dateTotals().map(x => x.total));

  public chartOptions = computed<Partial<ChartOptionsLine>>(() => ({
    series: [
      {
        name: 'Ingresos',
        data: this.series()
      },
    ],
    chart: {
      height: 350,
      type: 'line',
      zoom: { enabled: false },
      toolbar: { show: false },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'straight',
    },
    grid: {
      padding: { bottom: 20 },
      row: {
        colors: ['#f3f3f3', 'transparent'], // alternar colores de fila
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: this.labels(),
      labels: {
        rotate: -45, // rotar etiquetas
        rotateAlways: true, // 🔹 fuerza la rotación incluso si hay espacio
        hideOverlappingLabels: false,
        trim: true,
        style: {
          fontSize: '12px',
        },
      }
      // type: 'datetime',
    },
    tooltip: {
      x: {
        format: 'dd MMM',
      }
    },
    responsive: [
      {
        breakpoint: 1200, // pantallas grandes
        options: {
          chart: {
            width: 700,
            height: 350,
          },
          legend: { position: 'right' },
        },
      },
      {
        breakpoint: 992, // laptops / tablets grandes
        options: {
          chart: {
            width: 500,
            height: 320,
          },
          legend: { position: 'bottom' },
        },
      },
      {
        breakpoint: 768, // tablets verticales
        options: {
          chart: {
            width: 420,
            height: 300,
          },
          legend: { position: 'bottom' },
          xaxis: {
            labels: {
              rotate: -45,
              style: { fontSize: '10px' },
            },
          },
        },
      },
      {
        breakpoint: 480, // móviles estándar (~Galaxy S10, Pixel 4a)
        options: {
          chart: {
            width: 500, // 👈 mayor que el ancho real del dispositivo
            height: 280,
          },
          legend: { position: 'bottom' },
          xaxis: {
            labels: {
              rotate: -45,
              style: { fontSize: '9px' },
            },
          },
        },
      },
      {
        breakpoint: 376, // iPhone SE / móviles pequeños
        options: {
          chart: {
            width: 600, // 👈 ancho fijo mayor, para habilitar scroll
            height: 260,
          },
          legend: { position: 'bottom' },
          xaxis: {
            labels: {
              rotate: -45,
              style: { fontSize: '8px' },
            },
          },
        },
      },
    ],
  }));

  public setIncomes(transactions: Transaction[]) {
    this.incomeTransactions.set(transactions.filter(t => t.type === 'income'));
  }

  constructor() { }

}
