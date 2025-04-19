// voice.component.ts
import { Component } from '@angular/core';
import * as XLSX from 'xlsx';
import { RouterModule } from '@angular/router';


declare var webkitSpeechRecognition: any;

@Component({
  selector: 'app-voice',
  templateUrl: './voice.component.html',
  styleUrls: ['./voice.component.css'],
  standalone:true,
  imports: [RouterModule],
})
export class VoiceComponent {
  logText: string = "Click the button and speak your expense.";
  categories: string[] = ["food", "entertainment", "rent", "transport", "other"];

  startListening() {
    if (!('webkitSpeechRecognition' in window)) {
      alert("Speech recognition only works in supported browsers like Chrome.");
      return;
    }

    const recognition = new webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    this.logText = "Listening...";

    recognition.start();

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript.toLowerCase();
      this.logText = `Heard: "${transcript}"`;

      const match = transcript.match(/add\s+(\d+)\s+to\s+(\w+)/i);
      if (match) {
        const amount = parseFloat(match[1]);
        const category = match[2].toLowerCase();

        if (this.categories.includes(category)) {
          const input = <HTMLInputElement>document.getElementById(category);
          const current = parseFloat(input.value) || 0;
          input.value = (current + amount).toString();
          this.logText += ` → Added ₹${amount} to ${category}`;
        } else {
          this.logText += " → Category not recognized";
        }
      } else {
        this.logText += " → Could not understand the command";
      }
    };

    recognition.onerror = (event: any) => {
      this.logText = "Error: " + event.error;
    };
  }

  downloadExcel() {
    const data = this.categories.map(cat => {
      const amount = parseFloat((<HTMLInputElement>document.getElementById(cat)).value) || 0;
      return amount > 0 ? {
        Category: cat.charAt(0).toUpperCase() + cat.slice(1),
        Amount: amount
      } : null;
    }).filter(Boolean);

    if (data.length === 0) {
      alert("No expenses to export.");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Expenses");
    XLSX.writeFile(workbook, "My_Expense_Report.xlsx");
  }
}
