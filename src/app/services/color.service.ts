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
  private baseUrl = 'http://localhost:8000'; 

  constructor(private http: HttpClient) { }        

  getColors(): Observable<Color[]> {
    console.log('Fetching colors from:', this.baseUrl);
    return this.http.get<Color[]>(`${this.baseUrl}/colors`);
  }


  getColorCount(): Observable<{ count: number }> {
    return this.http.get<{ count: number }>(`${this.baseUrl}/color_count`);
  }


  addColor(color: { name: string; hex_value: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/colors`, color);
  }


  editColor(name: string, new_name: string, new_hex_value: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/colors/${name}`, { new_name, new_hex_value });
  }


  deleteColor(name: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/colors/${name}`);
  }
}