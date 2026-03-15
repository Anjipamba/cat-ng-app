import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from, map } from 'rxjs';
import { Cat, CatCreateDto, CatApiResponse } from '../models/cat.model';

@Injectable({
  providedIn: 'root'
})
export class CatService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:3000/api';

  getAll(): Observable<Cat[]> {
    return this.http.get<CatApiResponse>(`${this.baseUrl}/list`).pipe(
      map(res => res.data.map(item => ({
        id: item.id,
        ...item.info
      })))
    );
  }

  getById(id: string): Observable<Cat> {
    return this.http.get<CatApiResponse>(`${this.baseUrl}/list?id=${id}`).pipe(
      map(res => {
        const item = res.data[0];
        return {
          id: item.id,
          ...item.info
        };
      })
    );
  }

  create(cat: CatCreateDto): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/create`, cat);
  }

  update(id: string, cat: CatCreateDto): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/update?id=${id}`, cat);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete?id=${id}`);
  }
}
