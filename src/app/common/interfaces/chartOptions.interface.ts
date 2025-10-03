import {
    ApexNonAxisChartSeries,
    ApexResponsive,
    ApexChart,
} from 'ng-apexcharts';

export type ChartOptions = {
    series: ApexNonAxisChartSeries;
    chart: ApexChart;
    labels: string[];
    responsive: ApexResponsive[];
};
