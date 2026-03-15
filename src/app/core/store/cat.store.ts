import { Injectable, computed, inject, signal } from '@angular/core';
import { CatService } from '../services/cat.service';
import { Cat, CatCreateDto } from '../models/cat.model';
import { HttpErrorResponse } from '@angular/common/http';

export interface CatState {
  cats: Cat[];
  currentCat: Cat | null;
  loading: boolean;
  error: string | null;
}

const initialState: CatState = {
  cats: [],
  currentCat: null,
  loading: false,
  error: null
};

@Injectable({
  providedIn: 'root'
})
export class CatStore {
  private readonly catService = inject(CatService);
  private readonly state = signal<CatState>(initialState);
  
  readonly cats = computed(() => this.state().cats);
  readonly currentCat = computed(() => this.state().currentCat);
  readonly loading = computed(() => this.state().loading);
  readonly error = computed(() => this.state().error);
  
  loadCats(): void {
    this.updateState({ loading: true, error: null });
    this.catService.getAll().subscribe({
      next: (cats) => this.updateState({ cats, loading: false }),
      error: (err: HttpErrorResponse) => this.updateState({ error: err.message, loading: false })
    });
  }

  loadCat(id: string): void {
    this.updateState({ loading: true, error: null, currentCat: null });
    this.catService.getById(id).subscribe({
      next: (cat) => this.updateState({ currentCat: cat, loading: false }),
      error: (err: HttpErrorResponse) => this.updateState({ error: err.message, loading: false })
    });
  }

  createCat(catDto: CatCreateDto): void {
    this.updateState({ loading: true, error: null });
    this.catService.create(catDto).subscribe({
      next: () => {
        this.loadCats();
      },
      error: (err: HttpErrorResponse) => this.updateState({ error: err.message, loading: false })
    });
  }

  updateCat(id: string, catDto: CatCreateDto): void {
    this.updateState({ loading: true, error: null });
    this.catService.update(id, catDto).subscribe({
      next: () => {
        this.loadCats();
      },
      error: (err: HttpErrorResponse) => this.updateState({ error: err.message, loading: false })
    });
  }

  deleteCat(id: string): void {
    this.updateState({ loading: true, error: null });
    this.catService.delete(id).subscribe({
      next: () => {
        // Optimistically remove from list unconditionally instead of reload to be faster visually
        const updatedCats = this.cats().filter(cat => cat.id !== id);
        this.updateState({ cats: updatedCats, loading: false });
      },
      error: (err: HttpErrorResponse) => this.updateState({ error: err.message, loading: false })
    });
  }

  clearError(): void {
    this.updateState({ error: null });
  }

  private updateState(partialState: Partial<CatState>): void {
    this.state.update(current => ({ ...current, ...partialState }));
  }
}
