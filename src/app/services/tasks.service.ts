import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Tasks } from '../interfaces/tasks';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private api = 'https://jsonplaceholder.typicode.com';

  constructor(
    private http: HttpClient) 
  { }

  getAllTasks() {
    const path = `${this.api}/todos/`;
    return this.http.get<Tasks[]>(path);
  }
   
  getTask(id: string){
    const path = `${this.api}/todos/${id}`;
    return this.http.get<Tasks>(path);
  }

  createTask(task: Tasks){
    const path = `${this.api}/todos`;
    return this.http.post(path, task);
  }

  updateTask(taks: Tasks){
    const path = `${this.api}/todos/${taks.id}`;
    return this.http.put<Tasks>(path, taks);
  }

  deleteTask(id: string){
    const path = `${this.api}/todos/${id}`;
    return this.http.delete<Tasks>(path);
  }
}