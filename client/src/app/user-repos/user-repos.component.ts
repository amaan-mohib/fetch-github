import { Component, Input, OnInit } from '@angular/core';
import { IRepos } from '../types';

@Component({
  selector: 'app-user-repos',
  templateUrl: './user-repos.component.html',
  styleUrls: ['./user-repos.component.scss']
})
export class UserReposComponent implements OnInit {
  @Input() repos!: IRepos[];

  ngOnInit(): void {
    console.log(this.repos);

  }

  onClick(url: string) {
    window.open(url, '_blank')
  }
}
