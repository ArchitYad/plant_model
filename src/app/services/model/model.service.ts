import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModelService {
  private modelUrl = 'api/models'; 

  constructor(private http: HttpClient) { }


  updateModel(modelData: any): Observable<any> {
    return this.http.put(this.modelUrl, modelData); 
  }
}