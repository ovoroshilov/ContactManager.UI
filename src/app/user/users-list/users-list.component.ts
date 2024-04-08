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

  sortBy(property: string, descending: boolean = false) {
    const multiplier = descending ? -1 : 1;
    switch (property) {
      case 'name':
        this.users?.sort((a, b) => multiplier * a.name.localeCompare(b.name));
        break;
      case 'dateOfBirth':
        this.users?.sort((a, b) => multiplier * (new Date(a.dateOfBirth).getTime() - new Date(b.dateOfBirth).getTime()));
        break;
      case 'married':
        this.users?.sort((a, b) => multiplier * (a.married === b.married ? 0 : a.married ? 1 : -1));
        break;
      case 'phone':
        this.users?.sort((a, b) => multiplier * a.phone.localeCompare(b.phone));
        break;
      case 'salary':
        this.users?.sort((a, b) => multiplier * (parseInt(a.salary) - parseInt(b.salary)));
        break;
    }
  }
}
