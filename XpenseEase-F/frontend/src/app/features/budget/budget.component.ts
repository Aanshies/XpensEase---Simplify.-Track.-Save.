import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';



@Component({
  selector: 'app-budget',
  standalone: true, // Declare the component as standalone
  imports: [CommonModule,FormsModule,RouterModule], // Add FormsModule to imports
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent {
  income: number = 0;
  remainingBalance: number = 0;
  categories: { id: number, name: string, budget: number }[] = [];

  incomeInput: number = 0;
  categoryName: string = '';
  categoryBudget: number = 0;
  notification: string = '';

  addIncome(): void {
    if (this.incomeInput <= 0) {
      this.notification = 'Please enter a valid income amount!';
    } else {
      this.income = this.incomeInput;
      this.remainingBalance = this.income;
      this.notification = '';
      this.incomeInput = 0;
    }
  }

  addCategory(): void {
    if (!this.categoryName || this.categoryBudget <= 0 || this.categoryBudget > this.remainingBalance) {
      this.notification = 'Invalid category budget!';
    } else {
      const category = {
        id: Math.floor(Math.random() * 1000000),
        name: this.categoryName,
        budget: this.categoryBudget,
      };
      this.categories.push(category);
      this.remainingBalance -= this.categoryBudget;
      this.categoryName = '';
      this.categoryBudget = 0;
      this.notification = '';
    }
  }

  removeCategory(id: number): void {
    const categoryToRemove = this.categories.find(c => c.id === id);
    if (categoryToRemove) {
      this.remainingBalance += categoryToRemove.budget;
      this.categories = this.categories.filter(c => c.id !== id);
    }
  }
}
