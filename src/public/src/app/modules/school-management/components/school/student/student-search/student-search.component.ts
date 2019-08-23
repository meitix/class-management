import { Component, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { SchoolService } from '../../services/school.service';
import { FormControl } from '@angular/forms';
import { auditTime } from 'rxjs/operators';
import { Subscription, Observable } from 'rxjs';
import { IStudent } from 'src/app/modules/school-management/models/people/student.interface';

@Component({
  selector: 'app-student-search',
  templateUrl: './student-search.component.html',
  styleUrls: ['./student-search.component.css']
})
export class StudentSearchComponent implements OnInit , OnDestroy {

  @Output() studentSelect: EventEmitter<IStudent>;
  searchTerm: FormControl;
  private searchSubscription: Subscription;
  students: IStudent[];

  constructor(private schoolService: SchoolService) {
    this.searchTerm = new FormControl();
    this.studentSelect = new EventEmitter<IStudent>();
  }

  ngOnInit() {
    this.searchSubscription = this.searchTerm.valueChanges.pipe(auditTime(500)).subscribe(this.search.bind(this));
  }

  async search(q: string) {
    this.students = await this.schoolService.getStudents(this.schoolService.getSelectedSchoolId(), q).toPromise();
  }

  selectStudent(student: IStudent) {
    this.studentSelect.emit(student);
  }

  ngOnDestroy() {
    this.searchSubscription.unsubscribe();
  }
}
