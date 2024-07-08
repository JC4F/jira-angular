import { environment } from '@/environments/environment';
import { LoginPayload, LoginResponse } from '@/types';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl: string;
  constructor(private http: HttpClient) {
    this.baseUrl = environment.apiUrl;

    console.log('check is production: >>>', environment.production);
  }

  login(data: LoginPayload) {
    console.log(data);
    return this.http.get<LoginResponse>(`${this.baseUrl}/auth.json`);
  }
}
