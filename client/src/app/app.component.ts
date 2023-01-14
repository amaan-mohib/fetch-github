import { Component } from '@angular/core';
import { lastValueFrom, switchMap } from 'rxjs';
import { ServerService } from './server.service';
import { IRepos, IUser } from './types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  user: IUser | null = null;
  repos: IRepos[] | null = null;
  noOfRepos = 0;
  userLoading = false;
  reposLoading = false;
  searchError = false;

  async getUser(username: string) {
    return await lastValueFrom(this.serverService.fetchUser(username)).catch(() => null);
  }
  async getUserRepos(username: string, page?: number, page_size?: number) {
    return await lastValueFrom(this.serverService.fetchUserRepos(username, page, page_size)).catch(() => []);
  }
  async getUserReposWithLoading(username: string, page?: number, page_size?: number) {
    this.reposLoading = true;
    this.repos = await this.getUserRepos(username, page, page_size);
    this.reposLoading = false;
  }
  async fetchDetails(username: string) {
    this.userLoading = true;
    this.user = await this.getUser(username);
    this.userLoading = false;
    if (this.user) {
      this.reposLoading = true;
      this.repos = await this.getUserRepos(username);
      this.noOfRepos = this.user.public_repos;
      this.reposLoading = false;
    } else {
      this.searchError = true;
    }
  }

  constructor(
    private serverService: ServerService
  ) { }
}
