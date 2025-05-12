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
  private apiUrl = 'https://faure.cs.colostate.edu/~groupmateID/colors.php';                

  constructor(private http: HttpClient) { }        

  addColor(name: string, hex: string): Observable<Color> {
    return this.http.post<Color>(this.baseUrl, { name, hex });
  }
  
  getColors(): Observable<Color[]> {
    return this.http.get<Color[]>(this.baseUrl);
  }

  editColor(id: number, name: string, hex: string): Observable<Color> {
    return this.http.put<Color>(`${this.baseUrl}/${id}`, { name, hex });
  }
}
