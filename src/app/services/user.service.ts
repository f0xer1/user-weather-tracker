import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {User} from "../models/user/user.model";
import {environment} from "../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private storageKey = 'users';

  constructor(private http: HttpClient) {
  }

  getUser(): Observable<User> {
    return this.http.get<{ results: User[] }>(environment.USER_BASE_URL).pipe(
      map(response => response.results[0])
    );
  }

  saveUser(user: User): void {
    const savedUsers = this.getUsers();
    if (!savedUsers.some(u => u.email === user.email)) {
      savedUsers.push(user);
      localStorage.setItem(this.storageKey, JSON.stringify(savedUsers));
    }
  }

  getUsers(): User[] {
    const savedUsers = localStorage.getItem(this.storageKey);
    return savedUsers ? JSON.parse(savedUsers) : [];
  }


}
