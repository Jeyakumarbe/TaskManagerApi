import { Injectable } from '@angular/core';
import { Observable,from } from 'rxjs'
import { HttpClient, HttpHeaders,HttpResponse,HttpParams } from '@angular/common/http'
import { map } from 'rxjs/operators'
import { environment } from '../../environments/environment';
import { Task } from '../Model/Task';
import { SearchTask } from '../Model/SearchTask';
import { pipe } from '@angular/core/src/render3/pipe';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Response } from 'selenium-webdriver/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {

   constructor(private _http: HttpClient) { }

   GetAllTaskBySearchCriteria(item : SearchTask): Observable<any> {
    return this._http.post("http://localhost:49994/api/GetAllTaskBySearch", item,httpOptions).pipe(map((res: Response) => res),catchError((err : Response) => throwError(err)))
  }

  GetAllTask(): Observable<any> {
    return this._http.post("http://localhost:49994/api/GetAllTask", '',httpOptions).pipe(map((res: Response) => res),catchError((err : Response) => throwError(err)))
  }

  GetParentTask():Observable<any>{
    return this._http.get("http://localhost:49994/api/GetParentTask").pipe(map((res: Response) => res),catchError((err : Response) => throwError(err)))
  }

  GetTaskById(id: number): Observable<any> {
    return this._http.get("http://localhost:49994/api/GetTaskById/" + id).pipe(map((res: Response) => res),catchError((err : Response) => throwError(err)))
  }

  
  AddTask (item: Task): Observable<any> {
    return this._http.post("http://localhost:49994/api/AddTask", item,httpOptions).pipe(map((res: Response) => res),catchError((err : Response) => throwError(err)))
      
  }

  UpdateTask(item: Task): Observable<any> {
    return this._http.post("http://localhost:49994/api/UpdateTask", item).pipe(map((res: Response) => res),catchError((err : Response) => throwError(err)))
  }

  EndTask(id: number): Observable<any> {
    
    return this._http.get("http://localhost:49994/api/EndTask/" + id).pipe(map((res: Response) => res),catchError((err : Response) => throwError(err)))
  }

  DeleteTask(id: number): Observable<any> {
    return this._http.get("http://localhost:49994/api/DeleteTask/" + id).pipe(map((res: Response) => res),catchError((err : Response) => throwError(err)))
  }


}
