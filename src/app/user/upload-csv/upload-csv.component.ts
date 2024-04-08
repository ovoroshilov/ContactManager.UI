import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-upload-csv',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './upload-csv.component.html',
  styleUrl: './upload-csv.component.css'
})
export class UploadCsvComponent {

  csv?: File
  usersCountAdded = 0
  constructor(private service: UserService) { }

  onCSVUploadChange(event: Event) {
    const element = event.currentTarget as HTMLInputElement
    this.csv = element.files?.[0]
  }

  uploadCSV() {
    if (this.csv) {
      this.service.uploadCSV(this.csv).subscribe({
        next: (res) =>{
         window.location.reload()
        },
        error: (err) =>{
          console.error(err)
        }
      })
    }
  }
}
