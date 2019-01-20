import { Component, OnInit, Inject } from '@angular/core';
import { RestService} from '../rest.service';
import { FormControl,Validators,FormGroup } from '@angular/forms';
import { CLASSES } from '../class';
import { ActivatedRoute,Router } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { DatePipe } from '@angular/common';

export interface DialogData {
  studentId;
}

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
	studentData: any = {};
	classData = CLASSES ;
  form: FormGroup;
  imagePreview: string;

  constructor(public rest:RestService,private route: ActivatedRoute,private router: Router,public dialog : MatDialog ,public datePipe:DatePipe) { 
  	/*this.rest.getClasses().subscribe((response) => {
    console.log("res KV class: ",response);
    this.classData = response;
    });*/
  }

  ngOnInit() {
    this.form = new FormGroup({
      'first_name' : new FormControl('',{ 
        validators:[Validators.required, Validators.minLength(3)] 
      }),
      'last_name' : new FormControl('',{ 
        validators:[Validators.required, Validators.minLength(3)] 
      }),
      'father_name' : new FormControl('',{ 
        validators:[Validators.required, Validators.minLength(3)] 
      }),
      'mother_name' : new FormControl('',{ 
        validators:[Validators.required, Validators.minLength(3)] 
      }),
      'address' : new FormControl('',{ 
        validators:[Validators.required, Validators.minLength(3)] 
      }),
       'gender' : new FormControl('',{ 
        validators:[Validators.required] 
      }),
        'contact_number' : new FormControl('',{ 
        validators:[Validators.required, Validators.minLength(3)] 
      }),
         'email' : new FormControl('',{ 
        validators:[Validators.required, Validators.minLength(3)] 
      }),
          'dob' : new FormControl('',{ 
        validators:[Validators.required] 
      }),
           'class' : new FormControl('',{ 
        validators:[Validators.required] 
      }),
           'image' : new FormControl('',{
             validators:[Validators.required]
           }),
            'adhaar_no' : new FormControl('',{ 
        validators:[Validators.required, Validators.minLength(10)] 
      }),
             'father_occupation' : new FormControl('',{ 
        validators:[Validators.required, Validators.minLength(10)] 
      }),
             'father_qualification' : new FormControl('',{ 
        validators:[Validators.required, Validators.minLength(10)] 
      }),
             'only_child' : new FormControl('',{ 
        validators:[Validators.required] 
      }),
              'annual_income' : new FormControl('',{ 
        validators:[Validators.required, Validators.minLength(4)] 
      }),

    })
  }

  ngOnDestroy() {
    //this.sub.unsubscribe();
  }
 onImagePicked(event:Event){
   const file = (event.target as HTMLInputElement).files[0];
   this.form.patchValue({image:file});
   this.form.get('image').updateValueAndValidity();
   const reader = new FileReader();
   reader.onload = () => {
     this.imagePreview = reader.result;
   };
   reader.readAsDataURL(file);

 }

  submitStudent() {
    let keys = Object.keys(this.form.controls);
    let values = Object.values(this.form.value);
   this.form.value.dob= this.datePipe.transform(this.form.value.dob, 'yyyy-MM-dd');
    let classValue = this.form.value.class;
    var studentObj;
    keys.push('roll_number');
    let rollNumberObj = {"fn": "selectMaxRollNumber","params":["students","class",classValue ]};
    this.rest.getRollNumber(rollNumberObj).subscribe((response) => {
    if(response[0]['roll_number'] == null || response[0]['roll_number'] == 'undefined'){
    values.push(1);
    }else{
    values.push(response[0]['roll_number']);
    }
   	  studentObj = {"fn": "insert","params": ["students",keys,values]};
   	   	this.rest.postStudent(studentObj).subscribe((response) => {
           this.openDialog();
           console.log("Student added. !!");
           this.form.reset();
  	  });
       
  	});
}

openDialog() {
    const dialogRef = this.dialog.open(SaveDialogContent);
  }

}

@Component({
  selector: 'save-dialog',
  templateUrl: '../save_dialog.html',
})
export class SaveDialogContent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData,public rest: RestService,public router: Router) {}
  //this.router.navigate(['/liststudent']);
}