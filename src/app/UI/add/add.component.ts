import { Component, OnInit } from '@angular/core';
import { Task } from '../../Model/Task';
import { DropDownList } from '../../Model/DropDownList';
import { ActivatedRoute } from '@angular/router';
import { TaskServiceService } from '../../Service/task-service.service';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  public parenttask : DropDownList [];
  public Task : Task = new Task(); 

  public Taskid : any;
  public ButtonType : any;

  constructor(
    private route: ActivatedRoute,private service: TaskServiceService
  ) { }

  ngOnInit() {
    

    this.Taskid = +this.route.snapshot.paramMap.get('id');
    if(this.Taskid != 0 && this.Taskid != null)
    {
      this.ButtonType = "Update"
      this.GetAllParentTask();
      this.service.GetTaskById(this.Taskid).subscribe(data =>{
        this.Task = data;   
        this.Task.ParentTask_ID = (this.Task.ParentTask_ID == null ? 0 : this.Task.ParentTask_ID);   
      },err => {alert("Error Occured")});
    }
    else
    {
      this.ButtonType = "Submit"
      this.GetAllParentTask();
      this.Task.ParentTask_ID = (this.Task.ParentTask_ID == null ? 0 : this.Task.ParentTask_ID);   
    }
    
  }  
  GetAllParentTask() :void{
    this.service.GetParentTask().subscribe(res =>{
      this.parenttask = res;
    });
  }

  SumbitTask() : void {
    if(this.ButtonType == "Submit")
    {
        this.service.AddTask(this.Task).subscribe(data =>{
        alert("Task Added successfully");
      },err => {alert("Error Occured")});
    }
    else{
      this.service.UpdateTask(this.Task).subscribe(data =>{
        alert("Task updated successfully");
      },err => {alert("Error Occured")});
    }
    
  }

  RestTask() : void {
    this.Task = new Task();
    this.Task.ParentTask_ID = (this.Task.ParentTask_ID == null ? 0 : this.Task.ParentTask_ID); 
  }

}
