import {Component, Input, OnInit} from '@angular/core';
import {RouterLink, RouterOutlet} from "@angular/router";
import {NgForOf} from "@angular/common";
import {UserComponent} from "../user/user.component";
import {User} from "../../models/user/user.model";

@Component({
  selector: 'saved-users-list',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
    NgForOf,
    UserComponent
  ],
  templateUrl: './saved-users-list.component.html'
})
export class SavedUsersListComponent implements OnInit {
  users: User[] = [];

  ngOnInit(): void {
    const savedUsers = localStorage.getItem('users');
    if (savedUsers) {
      this.users = JSON.parse(savedUsers);
    }
  }
}
