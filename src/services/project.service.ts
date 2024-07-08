import { environment } from '@/environments/environment';
import { projectResponse } from '@/types';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private baseUrl: string;
  constructor(private http: HttpClient) {
    this.baseUrl = environment.apiUrl;
  }

  fetchProject() {
    return this.http.get<projectResponse>(`${this.baseUrl}/project.json`);
  }
}
