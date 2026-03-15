import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CatStore } from '../../core/store/cat.store';

@Component({
  selector: 'app-cat-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './cat-list.component.html',
  styleUrl: './cat-list.component.scss'
})
export class CatListComponent implements OnInit {
  public store = inject(CatStore);

  ngOnInit(): void {
    if (this.store.cats().length === 0) {
      this.store.loadCats();
    }
  }

  refresh(): void {
    this.store.loadCats();
  }
}
