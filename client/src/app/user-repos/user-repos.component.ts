import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { IRepos } from '../types';

@Component({
  selector: 'app-user-repos',
  templateUrl: './user-repos.component.html',
  styleUrls: ['./user-repos.component.scss']
})
export class UserReposComponent implements OnInit, OnChanges {
  @Input() repos!: IRepos[];
  @Input() totalItems!: number;
  @Input() reposLoading!: boolean;
  @Output() pageUpdate = new EventEmitter();
  paginateConfig = {
    id: 'paginator',
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: this.totalItems
  }

  ngOnInit(): void {
    this.paginateConfig.totalItems = this.totalItems;
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['totalItems'])
      this.paginateConfig.totalItems = changes['totalItems'].currentValue;
  }

  onClick(url: string) {
    window.open(url, '_blank')
  }
  onPageChange(page: number) {
    this.paginateConfig.currentPage = page;
    this.pageUpdate.emit(page);
  }
}
