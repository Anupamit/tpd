import { Component, OnInit ,Inject,Input } from '@angular/core';
import { RestService} from '../rest.service';
import { FormControl,Validators,FormGroup ,NgForm} from '@angular/forms';
import { CLASSES } from '../class';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-college-receipt',
  templateUrl: './college-receipt.component.html',
  styleUrls: ['./college-receipt.component.css']
})
export class CollegeReceiptComponent implements OnInit {
  studentData: any = {};
  classData : any[] ;
  sum;
  studentList;
  sn_number;
  roll_no: number;
  admissionFee:number =5100;
  session = '2019-20';
  todayDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  snoDisabled: boolean= true;
  fee:number;
  isFee: boolean=true;
  form: FormGroup;
  classValue:any;
  rollNum:any;
  discount:Number;
  submittedFee:any;
  constructor(public datePipe : DatePipe,public rest: RestService,private spinnerService: Ng4LoadingSpinnerService,private router: Router) {}

  ngOnInit() {
    this.getSno();
     this.rest.getClassData().then((response) => {
      console.log("class data: ",response);
      this.classData = response;
    });
  }
  saveStudentFee(form: NgForm){
    if(form.invalid){
    alert("Please enter all mandatory fields.");
    return false;
    }
    console.log("form: ",form.value);
    let student_name=form.value.student_name.split('-');
    form.value.student_name = student_name[0];
     this.rest.postCollegeReceipt(form.value).then((response) => {
      console.log("post 1");
       alert("Receipt added. !!");
       this.router.navigate(['/college_receiptList']);

    });
  }
  getClass(formData){
    this.classValue = formData.controls.class.value;
    this.rest.getStudentsByClass(this.classValue).then((response) => {
    console.log("res KV: ",response);
    this.studentList = response;
  });
}

getStudentInfo(std){
   let splitStr =  (std).split("-");
   this.rollNum = (splitStr[1]).split("-");
   this.discount = Number((splitStr[2]).split("-"));
   console.log("getStudentInfo studentKV:"+this.rollNum[0]+"and class: "+this.classValue+" and dis "+this.rollNum[1]);
   if(this.discount != null){
   	this.submittedFee = this.admissionFee - Number(this.discount) ;
   }
   else {
   	this.submittedFee = this.admissionFee ;
   }
   console.log("submittedFee: "+this.submittedFee);
   this.isFee = false;
}
getSno(){
  this.rest.getReceiptSno().then((response)=> {
    console.log("sno: ",response);
    this.sn_number = response;
    this.snoDisabled = false;
  });
}
getAutoStudentSelect = (stdInfo) => {
  let splitted = (stdInfo.option.value).split("-");
  console.log("splitted: ",splitted);
  this.roll_no = splitted[1];
  console.log("getAutoStudentSelect: ",stdInfo);
}
getSubmittedAmt(event) {
 console.log("getSubmittedAmt: "+event);
 this.submittedFee= event - Number(this.discount);
}
}
