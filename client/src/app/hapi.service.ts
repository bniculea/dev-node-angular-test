import { HttpClient, HttpHeaders,HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Config } from 'protractor';
import { Observable } from 'rxjs';


  @Injectable({ providedIn: 'root' })
  export class HapiService{
    private backendApi = 'http://localhost:3000';
    
    constructor(private http:HttpClient){}

    checkBackendHealth():Observable<HttpResponse<Config>>  {
        const url = `${this.backendApi}/health`;
        return this.http.get<Config>(
            url, {observe: 'response'});
    }

    generateData(): Observable<HttpResponse<Config>> {
      const url = `${this.backendApi}/create`;
      return this.http.post<Config>(url,{}, {observe:'response'});
    }

    getAggregationTime():Observable<HttpResponse<Config>>{
      const url = `${this.backendApi}/time`;
      return this.http.get<Config>(url, {observe: 'response'});
    }
}