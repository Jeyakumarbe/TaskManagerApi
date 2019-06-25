import { Component, OnInit } from '@angular/core';
import { Task } from '../../Model/Task';
import { SearchTask } from '../../Model/SearchTask';
import { DropDownList } from '../../Model/DropDownList';
import { TaskServiceService } from '../../Service/task-service.service';
import { map } from 'rxjs/operators';
import { pipe } from '@angular/core/src/render3/pipe';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  public parenttask : DropDownList [];
  public SearchTask : SearchTask = new SearchTask();
  public Task : Task[] ;
  
  constructor(private service: TaskServiceService) { 
    
  }

  ngOnInit() {
    this.GetAllTask();
    this.GetAllParentTask();
   
    
  }
  GetAllParentTask() :void{
    this.service.GetParentTask().subscribe(res =>{
      this.parenttask = res;
    });
  }

  EndTask(ID:number) : void{
    this.service.EndTask(ID).subscribe(res =>{
      this.GetAllTask();
      alert("Task Ended Successfully");
    });
  }
  DeleteTask(ID:number) : void{
    this.service.DeleteTask(ID).subscribe(res =>{
      this.GetAllTask();
      alert("Task Deleted Successfully");
    });
  }
  
  SearchTaskList() : void{
    this.service.GetAllTaskBySearchCriteria(this.SearchTask).subscribe(data =>{
      this.Task = data; 
      if(this.SearchTask.ParentTaskID == undefined || this.SearchTask.ParentTaskID == null)   
      {
        this.SearchTask.ParentTaskID =  0 ;
      }  
    
    },err => {alert("Error Occured")});
  }

  GetAllTask() : void{
    this.service.GetAllTask().subscribe(data =>{
      this.Task = data; 
      if(this.SearchTask.ParentTaskID == undefined || this.SearchTask.ParentTaskID == null)   
      {

        this.SearchTask.ParentTaskID =  0 ;
      }   
      
    },err => {alert("Error Occured")});
  }


}
