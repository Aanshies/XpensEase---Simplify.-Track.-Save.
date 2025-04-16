import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';  // Import CommonModule for pipes like 'number'
import { FormsModule } from '@angular/forms'; 
import { RouterModule } from '@angular/router';
   // Import FormsModule for ngModel

@Component({
  selector: 'app-multicurrency',
  templateUrl: './multicurrency.component.html',
  styleUrls: ['./multicurrency.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule],  // Add CommonModule and FormsModule
})
export class MulticurrencyComponent implements OnInit {
  totalBudget: number = 0;
  remainingBudget: number = 0;
  selectedCurrency: string = 'USD';
  currencySymbol: string = '$';
  expenseAmount: number = 0;
  expenseCategory: string = 'Food';
  expenses: any[] = [];
  alertMessage: string = '';
  progressPercentage: number = 100;

  constructor() {}

  ngOnInit(): void {}

  setBudget(): void {
    this.remainingBudget = this.totalBudget;
    this.updateCurrencySymbol();
    this.updateProgress();
  }

  updateCurrencySymbol(): void {
    const currencySymbols: { [key: string]: string } = {
      USD: '$',
      INR: '₹',
      EUR: '€',
      GBP: '£',
    };
    this.currencySymbol = currencySymbols[this.selectedCurrency] || '$';
    this.updateProgress();
  }

  addExpense(): void {
    if (this.expenseAmount > 0) {
      this.expenses.push({
        category: this.expenseCategory,
        amount: this.expenseAmount,
      });
      this.remainingBudget -= this.expenseAmount;
      this.updateProgress();
    }
  }

  updateProgress(): void {
    this.progressPercentage = (this.remainingBudget / this.totalBudget) * 100;
    if (this.remainingBudget < 0) {
      this.alertMessage = '⚠️ Alert: Budget exceeded!';
    } else {
      this.alertMessage = '';
    }
  }
}
