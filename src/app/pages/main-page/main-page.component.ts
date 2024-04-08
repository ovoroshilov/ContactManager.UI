import { Component } from '@angular/core';
import { UsersListComponent } from '../../user/users-list/users-list.component';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [UsersListComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {

}
