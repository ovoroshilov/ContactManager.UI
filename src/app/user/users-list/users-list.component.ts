import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';
import { UploadCsvComponent } from "../upload-csv/upload-csv.component";


@Component({
  selector: 'app-users-list',
  standalone: true,
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css',
  imports: [CommonModule, UploadCsvComponent]
})
export class UsersListComponent implements OnInit {
  users?: User[]
  constructor(private service: UserService) { }

  ngOnInit(): void {
    this.service.getAllUsers().subscribe({
      next: (res) => {
        this.users = res
      },
      error: (err) => {
        console.error(err)
      }
    })
  }

  deleteUser(id: string) {
    this.service.deleteUser(id).subscribe({
      next: (res) => {
        console.log(`User with id: ${res.id} was deleted`)
        window.location.reload()
      },
      error: (err) => {
        console.error(err)

      }
    })
  }

  sortByName() {
    this.users?.sort((a, b) => a.name.localeCompare(b.name));
  }

  sortByDateOfBirth() {
    this.users?.sort((a, b) => new Date(a.dateOfBirth).getTime() - new Date(b.dateOfBirth).getTime());
  }

  sortByMarried() {
    this.users?.sort((a, b) => a.married === b.married ? 0 : a.married ? 1 : -1);
  }

  sortByPhone(){
    this.users?.sort((a, b) => a.phone.localeCompare(b.phone));
  }

  sortBySalary(){
    this.users?.sort((a, b) => parseInt(a.salary) - parseInt(b.salary));
  }
}
