import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';


import { AppComponent } from './app.component';
import { StudentComponent,SaveDialogContent } from './student/student.component';
import { LoginComponent } from './login/login.component';
import { BooksComponent } from './books/book.component';
import { ListBookComponent } from './books/viewBook.component';
import { ReceiptComponent } from './receipt/receipt.component';
import { RestService } from './rest.service';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule, MatIconModule, MatSidenavModule, MatListModule, MatToolbarModule, MatSelectModule,MatDatepickerModule, MatRadioModule, MatNativeDateModule, MatCardModule, MatProgressSpinnerModule, MatMenuModule,MatTabsModule,MatTooltipModule,MatSortModule,MatAutocompleteModule} from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import {FormsModule,ReactiveFormsModule} from "@angular/forms";

import { ListStudentComponent,DialogContent } from './list-student/list-student.component';
import { MatTableModule} from '@angular/material/table';


import { MatDialogModule } from '@angular/material/dialog';

import { EditStudentComponent } from './edit-student/edit-student.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { HomeComponent } from './home/home.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { AttendanceViewComponent } from './attendance/attendanceView.component';
import { LibraryComponent } from './library/library.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StudentDetailComponent } from './student/studentDetail.component';
import { ListReceiptComponent } from './receipt/list-receipt.component';
import { EditReceiptComponent } from './receipt/edit-receipt.commponent';





//import { MatDatepickerModule }  from "@angular/material/datepicker";
const appRoutes: Routes =[
{
	/*path: '',
	redirectTo: '/',
  pathMatch: 'full'*/
  path: '',
  component: LoginComponent
},
{
	path: 'student',
    component: StudentComponent
},
{
  path: 'login',
  component: LoginComponent
},
{
  path : 'liststudent',
  component: ListStudentComponent
},

{ path: 'student/:id', 
  component: EditStudentComponent 
},
{
  path : 'receipt',
  component: ReceiptComponent
},
{
  path : 'receiptList',
  component: ListReceiptComponent
},
{ path: 'editReceipt/:id', 
  component: EditReceiptComponent 
},
{
  path : 'bookAdd',
  component: BooksComponent
},
{
  path : 'bookView',
  component: ListBookComponent
},
{
  path : 'home',
  component: HomeComponent
},
{
  path : 'attendance',
  component: AttendanceComponent
},
{
  path : 'attendanceView',
  component: AttendanceViewComponent
},
{
  path : 'issueBook',
  component: LibraryComponent
},
{
  path : 'issuedBooksView',
  component: LibraryComponent
},
{
  path : 'dashboard',
  component: DashboardComponent
},
{
  path : 'studentDetail/:id',
  component: StudentDetailComponent
},

];

@NgModule({
  declarations: [
    AppComponent,
    StudentComponent,
    LoginComponent,
    ListStudentComponent,

    DialogContent,
    EditStudentComponent,

    ReceiptComponent,
    DialogContent,
    BooksComponent,
    ListBookComponent,
    HomeComponent,
    AttendanceComponent,
    AttendanceViewComponent,
    LibraryComponent,
    SaveDialogContent,
    DashboardComponent,
    StudentDetailComponent,
    ListReceiptComponent,
    EditReceiptComponent

  ],
  imports: [
  RouterModule.forRoot(
  	appRoutes,
  	{
  		enableTracing: true }
  	),
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatSelectModule,
    FormsModule,
    MatDatepickerModule,
    MatRadioModule,
    MatButtonModule,
    MatNativeDateModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    HttpClientModule,
    MatTabsModule,
    MatTableModule,
    MatTooltipModule,
    MatDialogModule,
    MatExpansionModule,
    ReactiveFormsModule,
    MatSortModule,
    MatAutocompleteModule

  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
  entryComponents: [DialogContent,SaveDialogContent]
})
export class AppModule { }
