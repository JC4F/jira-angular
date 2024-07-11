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
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  login(_data: LoginPayload) {
    return this.http.get<LoginResponse>(`${this.baseUrl}/auth.json`);
  }
}
