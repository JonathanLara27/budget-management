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

export type ChartOptionsLine = {
    series: ApexAxisChartSeries;
    tooltip: ApexTooltip;
    chart: ApexChart;
    xaxis: ApexXAxis;
    dataLabels: ApexDataLabels;
    grid: ApexGrid;
    stroke: ApexStroke;
    title: ApexTitleSubtitle;
    responsive: ApexResponsive[];
};