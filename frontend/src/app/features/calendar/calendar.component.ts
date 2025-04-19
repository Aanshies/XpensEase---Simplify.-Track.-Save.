import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


interface ExpenseItem {
  item: string;
  amount: number;
}

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],

})
export class CalendarComponent {
  latestExpenseDate: string = '2023-05-10';
  selectedDate: string = this.latestExpenseDate;
  showModal: boolean = false;
  totalAmount: number = 0;
  expenseList: ExpenseItem[] = [];

  expenseHistory: Record<string, ExpenseItem[]> = {
    '2023-05-10': [
      { item: 'Groceries', amount: 500 },
      { item: 'Electricity Bill', amount: 800 },
      { item: 'Dinner', amount: 999 }
    ],
    '2023-06-15': [
      { item: 'Movie', amount: 600 },
      { item: 'Snacks', amount: 200 }
    ]
  };

  openModal() {
    this.showModal = true;
    this.selectedDate = this.latestExpenseDate;
    this.updateDate();
  }

  closeModal() {
    this.showModal = false;
  }

  updateDate() {
    const expenses = this.expenseHistory[this.selectedDate];
    this.expenseList = expenses || [];
    this.totalAmount = this.expenseList.reduce((sum, e) => sum + e.amount, 0);
    this.latestExpenseDate = this.selectedDate;
  }
}
