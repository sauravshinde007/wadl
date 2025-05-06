import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';  // ✅ add this
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true, // ✅ required for standalone
  imports: [RouterOutlet, FormsModule, CommonModule], // ✅ include FormsModule
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'todo-app';

  newTask: string = '';
  tasks: { text: string; editing: boolean }[] = [];

  addTask() {
    if (this.newTask.trim()) {
      this.tasks.push({ text: this.newTask.trim(), editing: false });
      this.newTask = '';
    }
  }

  deleteTask(index: number) {
    this.tasks.splice(index, 1);
  }

  editTask(index: number) {
    this.tasks[index].editing = true;
  }

  saveTask(index: number) {
    this.tasks[index].editing = false;
  }
}
