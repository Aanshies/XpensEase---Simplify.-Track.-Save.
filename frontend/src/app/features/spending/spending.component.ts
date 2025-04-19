import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Expense {
  id: number;
  name: string;
  amount: number;
  category: string;
  date: string;
}

@Component({
  selector: 'app-spending',
  standalone:true,
  templateUrl: './spending.component.html',
  styleUrls: ['./spending.component.css'],
  imports: [CommonModule,FormsModule,RouterModule]
})
export class SpendingComponent {
  expenseName = '';
  expenseAmount: number | null = null;
  expenseCategory = '';
  expenseDate = '';
  selectedCategory = 'All';

  categories = ['Food', 'Transport', 'Entertainment', 'Other'];
  expenses: Expense[] = [];
  filteredExpenses: Expense[] = [];

  addExpense(event: Event) {
    event.preventDefault();

    const newExpense: Expense = {
      id: Date.now(),
      name: this.expenseName,
      amount: this.expenseAmount || 0,
      category: this.expenseCategory,
      date: this.expenseDate
    };

    this.expenses.push(newExpense);
    this.filterExpenses();
    this.resetForm();
  }

  deleteExpense(id: number) {
    this.expenses = this.expenses.filter(e => e.id !== id);
    this.filterExpenses();
  }

  editExpense(expense: Expense) {
    this.expenseName = expense.name;
    this.expenseAmount = expense.amount;
    this.expenseCategory = expense.category;
    this.expenseDate = expense.date;

    this.deleteExpense(expense.id);
  }

  filterExpenses() {
    if (this.selectedCategory === 'All') {
      this.filteredExpenses = [...this.expenses];
    } else {
      this.filteredExpenses = this.expenses.filter(e => e.category === this.selectedCategory);
    }
  }

  getTotalAmount(): number {
    return this.filteredExpenses.reduce((sum, e) => sum + e.amount, 0);
  }

  resetForm() {
    this.expenseName = '';
    this.expenseAmount = null;
    this.expenseCategory = '';
    this.expenseDate = '';
  }
}
