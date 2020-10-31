import { HttpClient, HttpHeaders,HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Config } from 'protractor';
import { Observable } from 'rxjs';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  @Injectable({ providedIn: 'root' })
  export class HapiService{
    private backendApi = 'http://localhost:3000';
    
    constructor(private http:HttpClient){}

    checkBackendHealth():Observable<HttpResponse<Config>>  {
        const url = `${this.backendApi}/health`;
        return this.http.get<Config>(
            url, {observe: 'response'});
    }
}