import { Component, Input, OnInit } from '@angular/core';
import { IUser } from '../types';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  @Input() user!: IUser
  ngOnInit() {
    // console.log(this.user);

  }
}
