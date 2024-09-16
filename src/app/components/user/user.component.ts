import { Component, Input } from '@angular/core';
import { UserModel } from "../../models/user/user.model";

@Component({
  selector: 'app-user',
  standalone: true,
  templateUrl: './user.component.html'
})
export class UserComponent {
  @Input() user!: UserModel;
}
