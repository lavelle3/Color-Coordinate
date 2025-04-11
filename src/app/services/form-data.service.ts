import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormDataService {
  private dataSource = new BehaviorSubject<any>(null);
  formData$ = this.dataSource.asObservable();

  updateFormData(data: any) {
    this.dataSource.next(data);
  }
}
