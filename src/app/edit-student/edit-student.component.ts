import { Component, OnInit } from '@angular/core';
import { FormControl,NgForm,Validators} from '@angular/forms';
import { RestService } from '../rest.service';
import { ActivatedRoute } from '@angular/router';
import { CLASSES } from '../class';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})
export class EditStudentComponent implements OnInit {
    studentData: any = [];
    editStudentId;
	private sub: any;
    editStudentData;
    //classData = CLASSES ;
    classData : any;
     minDate = new Date(2000, 0, 1);
  maxDate :any;

  constructor(public rest: RestService,private route:  ActivatedRoute,private router: Router ,public datePipe: DatePipe) { }

  ngOnInit() {
    let date = this.datePipe.transform(new Date(), 'yyyy-MM-dd') ;
    const now = new Date();
    now.setFullYear(now.getFullYear() - 1);
    this.maxDate = now.toISOString().slice(0,10);
    this.sub = this.route.params.subscribe(params => {
        console.log("std id: "+[params['id']]);
        this.editStudentId = params['id'];
        this.rest.getStudentsById(params['id']).then((response) => {
          console.log("res KV: ",response);
          this.studentData = response ;
          console.log("studentData edit :",this.studentData);
        });
    });
    this.rest.getClassData().then((response) => {
      console.log("class data: ",response);
      this.classData = response;
    });
  }

   submitEditStudent(form: NgForm) {
    if(form.invalid){
    return;
    }
    console.log("edit form :",form);
    let keys = Object.keys(form.controls);
    form.value.dob= this.datePipe.transform(form.value.dob, 'yyyy-MM-dd');
    //form.value.dob = (form.value.dob).toString();
    let values = Object.values(form.value);
    //let classValue = Object.values(form.value.class) ;
    this.rest.update('students',this.editStudentId,form.value).then((response) => {
       alert("Student Edited !!");
       this.router.navigate(['/liststudent']);
    });
  }
}

