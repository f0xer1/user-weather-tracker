import { Component, Input } from '@angular/core';
import { User } from "../../models/user/user.model";

@Component({
  selector: 'app-user',
  standalone: true,
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  @Input({ required: true }) user!: User;
}
