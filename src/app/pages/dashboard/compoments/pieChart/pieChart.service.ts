import { Injectable, computed, signal } from '@angular/core';
import { ChartOptions, Transaction } from 'src/app/common/interfaces';

@Injectable({
  providedIn: 'root'
})
export class PieChartService {

  private expenseTransactions = signal<Transaction[]>([]);

  public expenses = computed(() => this.expenseTransactions());

  private categoryTotals = computed(() => {
    const map = new Map<string, number>();
    const transactions = this.expenseTransactions();

    transactions.forEach(t => {
      const cat = (t.category ?? 'Sin categoría').trim() || 'Sin categoría';
      const current = map.get(cat) ?? 0;
      map.set(cat, +(current + t.amount).toFixed(2)); // 👈 aquí aplicas el redondeo
    });

    // convertir a array y ordenar
    const arr = Array.from(map.entries())
      .map(([category, total]) => ({ category, total: +total.toFixed(2) })) // 👈 seguridad extra
      .sort((a, b) => b.total - a.total);

    return arr;
  });


  private labels = computed(() => this.categoryTotals().map(x => x.category));
  private series = computed(() => this.categoryTotals().map(x => x.total));

  public chartOptions = computed<Partial<ChartOptions>>(() => ({
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
  })
  );

  public setExpenses(transactions: Transaction[]) {
    this.expenseTransactions.set(transactions.filter(t => t.type === 'expense'));
  }

  // Ejemplo: agregar un gasto (la señal actualizará el gráfico automáticamente)
  // public addExpense(transaction: Transaction) {
  //   if(!transaction || transaction.type !== 'expense') return;
  //   const normalizedCategory = (transaction.category ?? 'Sin categoría').trim() || 'Sin categoría';
  //   this.expenseTransactions.update(expenses => [...expenses, { ...transaction, category: normalizedCategory }]);
  // }

  // // Ejemplo de uso: eliminar el último gasto
  // public removeLast() {
  //   this.expenseTransactions.update(list => list.slice(0, -1));
  // }

  constructor() { }

}
