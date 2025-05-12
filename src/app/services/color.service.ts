import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Color {
  id: number;
  name: string;
  hex: string;
}

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  private apiUrl = 'http://localhost:3000/api/colors';

  constructor(private http: HttpClient) {}

  getColors(): Observable<Color[]> {
    return this.http.get<Color[]>(this.apiUrl);
  }

  addColor(name: string, hex: string): Observable<Color> {
    return this.http.post<Color>(this.apiUrl, { name, hex });
  }

  editColor(id: number, name: string, hex: string): Observable<Color> {
    return this.http.put<Color>(`${this.apiUrl}/${id}`, { name, hex });
  }

  deleteColor(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
