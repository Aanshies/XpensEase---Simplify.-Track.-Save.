import {
  Component,
  ViewChild,
  ElementRef
} from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { RouterModule } from '@angular/router';

Chart.register(...registerables);

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css'],
  standalone:true,
  imports: [RouterModule]
})
export class ExpenseComponent {
  @ViewChild('expenseChart') expenseChart!: ElementRef<HTMLCanvasElement>;
  @ViewChild('expenseBarChart') expenseBarChart!: ElementRef<HTMLCanvasElement>;

  categories = ['Food', 'Entertainment', 'Business', 'Rent', 'EMI', 'Other'];
  data: number[] = [0, 0, 0, 0, 0, 0];

  myDoughnutChart: any;
  myBarChart: any;

  showCharts = false; // 👈 Initially hidden

  updateExpenses(): void {
    // Get data from inputs
    const getValue = (id: string): number => {
      const input = document.getElementById(id) as HTMLInputElement;
      return input ? parseFloat(input.value) || 0 : 0;
    };

    this.data = [
      getValue('foodAmount'),
      getValue('entertainmentAmount'),
      getValue('businessAmount'),
      getValue('rentAmount'),
      getValue('emiAmount'),
      getValue('otherAmount')
    ];

    // Only create or update charts after button is clicked
    if (!this.showCharts) {
      this.showCharts = true;
      this.createCharts();
    } else {
      this.updateCharts();
    }
  }

  createCharts(): void {
    const doughnutCtx = this.expenseChart.nativeElement.getContext('2d');
    const barCtx = this.expenseBarChart.nativeElement.getContext('2d');

    this.myDoughnutChart = new Chart(doughnutCtx!, {
      type: 'doughnut',
      data: {
        labels: this.categories,
        datasets: [{
          data: this.data,
          backgroundColor: ['#3498DB', '#E74C3C', '#2ECC71', '#9B59B6', '#F39C12', '#1ABC9C']
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom'
          }
        }
      }
    });

    this.myBarChart = new Chart(barCtx!, {
      type: 'bar',
      data: {
        labels: this.categories,
        datasets: [{
          label: 'Expense Amount',
          data: this.data,
          backgroundColor: '#34495E'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true
          }
        },
        plugins: {
          legend: {
            display: false
          }
        }
      }
    });
  }

  updateCharts(): void {
    this.myDoughnutChart.data.datasets[0].data = this.data;
    this.myDoughnutChart.update();

    this.myBarChart.data.datasets[0].data = this.data;
    this.myBarChart.update();
  }
}
