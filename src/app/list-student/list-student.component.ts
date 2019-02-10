import { Component, OnInit,Inject,ViewChild } from '@angular/core';
import { RestService } from '../rest.service';
import { MatDialog, MAT_DIALOG_DATA ,MatTableDataSource,MatSort} from '@angular/material';
import { Router } from '@angular/router';

export interface DialogData {
  studentId;
}

@Component({
  selector: 'app-list-student',
  templateUrl: './list-student.component.html',
  styleUrls: ['./list-student.component.css']
})
export class ListStudentComponent implements OnInit {
studentList;
dataSource ;
displayedColumns = ['roll_number','first_name','father_name','mother_name','class','dob','uId'];


  constructor( public rest: RestService, public dialog: MatDialog) {}
 openDialog(studentData) {
    console.log("studentData console: ",studentData);
    const dialogRef = this.dialog.open(DialogContent, {
      data: {
        studentId: studentData.uId
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      console.log("Dialog result: ",result);
    });
  }

@ViewChild(MatSort) sort: MatSort;
  ngOnInit() {
    this.rest.getStudents().then((response) => {
    console.log("res KV: ",response);
    this.dataSource = new MatTableDataSource(response);
    console.log("dataSource mat:",this.dataSource);
    this.dataSource.sort = this.sort;
  });
    
  }
}

@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'delete_dialog.html',
})
export class DialogContent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData,public rest: RestService,private router: Router) {}
  deleteStudent(id) {
   console.log("delete : "+id);
     this.rest.delete("students",id).then((response) => {
       alert("Student deleted.");
       this.rest.getStudents().then((response) => {
    console.log("res KV getStudents: ",response);

});
       this.router.navigate(['/liststudent']);
    });
  }
}
