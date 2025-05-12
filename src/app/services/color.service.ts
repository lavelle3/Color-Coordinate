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

  //whoever uploads the colors.php file to mySQL, can you put your Id in below?
  private baseUrl = 'https://faure.cs.colostate.edu/~groupmateID/colors.php';

  constructor(private http: HttpClient) { }        

  addColor(name: string, hex: string): Observable<Color> {
    return this.http.post<Color>(this.baseUrl, { action: 'add', name, hex });
  }
  
  getColors(): Observable<Color[]> {
    return this.http.get<Color[]>(this.baseUrl);
  }

  editColor(id: number, name: string, hex: string): Observable<Color> {
    return this.http.post<Color>(this.baseUrl, { action: 'edit', id, name, hex });
  }

  deleteColor(id: number): Observable<any> {
    return this.http.post(this.baseUrl, { action: 'delete', id });
  }
}
