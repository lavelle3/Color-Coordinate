import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';   
import { Observable } from 'rxjs';                   

export interface Color {    
  name: string;
  hex_value: string;
}

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  private baseUrl = 'https://localhost:4263/api/manageColors.php';

  constructor(private http: HttpClient) { }        

  getColors(): Observable<Color[]> {
    return this.http.get<Color[]>(this.baseUrl + '?colors=true');
  }

  getColorCount(): Observable<{ count: number }> {
    return this.http.get<{ count: number }>(`${this.baseUrl}?color_count=true`);
  }

  addColor(color: { name: string; hex_value: string }): Observable<any> {
    return this.http.post(this.baseUrl, color);
  }

  editColor(name: string, new_name: string, new_hex_value: string): Observable<any> {
    return this.http.post(this.baseUrl, { action: 'edit', name, new_name, new_hex_value });
  }

  deleteColor(name: string): Observable<any> {
    return this.http.post(this.baseUrl, { action: 'delete', name });
  }
}