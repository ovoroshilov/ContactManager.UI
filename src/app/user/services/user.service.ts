import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  uploadCSV(file: File) : Observable<number>{
    const formData = new FormData()
    formData.append('file', file)
    return this.http.post<number>(`${environment.apiBaseUrl}/CSV/uploadCSV`, formData)
  }
  
  getAllUsers() : Observable<User[]>{
    return this.http.get<User[]>(`${environment.apiBaseUrl}/CSV`)
  }

  deleteUser(id: string) : Observable<User>{
    return this.http.delete<User>(`${environment.apiBaseUrl}/CSV/${id}`)
  } 
}
