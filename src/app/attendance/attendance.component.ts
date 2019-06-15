import { Component, OnInit,OnChanges } from '@angular/core';
import { CLASSES } from '../class';
import { FormControl,NgForm,Validators } from '@angular/forms';
import { RestService } from '../rest.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent {

classData = CLASSES;
classId;
studentData: any = [];
attendanceObj;
delAttendanceObj;
delId:any;
constructor(public rest:RestService,public router:Router,public datePipe: DatePipe){
 console.log("class:",this.classData);	
};

public getClassName(id): void {
	console.log("class name: "+id);
this.classId = id;  
console.log("getClassName:"+this.classId);
    let classObj = {"fn": "selectAllById","params": ["students",['class'],[id] ]};
    this.rest.getStudentsByClass(this.classId).then((response) => {
    	console.log("att response: ",response);
		 this.studentData = response;
    	 for(let i=0; i<((this.studentData).length ); i++){
           this.studentData[i].action = 'P';
		 }
	});
}

public getDate(date): void {
	console.log("date:",date);
}

onRadioClick(index,val,student) {
    this.studentData[index].action = val;
    console.log("student:",student);
    let date = this.datePipe.transform(new Date(), 'yyyy-MM-dd') ;
    let keys = ['date','class','roll_number','action','first_name','last_name'];
    let values = [date,student.class,student.roll_number,student.action,student.first_name,student.last_name];
    //this.delAttendanceObj = {"fn": "deleteRowAttendance","params": ["attendance",[student.roll_number],[date],[student.class] ]};
	console.log("roll_no: "+student.roll_number+" date: "+date+ "class: "+student.class);
	var attObj = {};
	keys.forEach((key, i) => attObj[key] = values[i]);
	//this.postAttendance(attObj);
	console.log("attObj: ",attObj);
	this.deleteAttendance(student.roll_number,date,student.class,attObj);
	
	
	
    }

    deleteAttendance= (roll_number,date,className,attObj) => {
    	this.rest.deleteRowAttendance("student_attendance",roll_number,date,className).then((response) => {
		console.log("delete attendance: "+response[0].uId);
		this.rest.delete("student_attendance",response[0].uId).then((response) => {
			alert("deleted");
		})
		//setTimeout(() => {
			this.postAttendance(attObj);
        //}, 1000);
	});
    }
    postAttendance= (Obj)=> {
    	this.rest.postAttendance(Obj).then((post_response) => {
		alert("attendance added.");
		//this.router.navigate(['/liststudent']);
	});

    }
}