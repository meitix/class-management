import { Component, OnInit } from '@angular/core';
import { SchoolService } from '../../../services/school.service';
import {
  IClass,
  Class
} from 'src/app/modules/school-management/models/edu/class.interface';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { IStatistics } from 'src/app/modules/school-management/models/edu/statistics.interface';

@Component({
  selector: 'app-statistics-create',
  templateUrl: './statistics-create.component.html',
  styleUrls: ['./statistics-create.component.css']
})
export class StatisticsCreateComponent implements OnInit {
  class: IClass;
  statistics: IStatistics;
  constructor(
    private schoolService: SchoolService,
    private route: ActivatedRoute
  ) {
    this.class = new Class();
  }

  ngOnInit() {
    this.route.parent.params.pipe(take(1)).subscribe(async params => {
      if (params.id) {
        this.class = await this.fetchClassData(
          this.schoolService.getSelectedSchoolId(),
          params.id
        );
        this.statistics = this.createForm(this.class);
      }
    });
  }

  createForm(_class: IClass) {
    const result = _class.students.map(student => {
      return {
        student: student,
        result: { present: false, homework: false, lesson: false }
      };
    });
    return result;
  }

  fetchClassData(schoolId: string, classId: string) {
    return this.schoolService.getClassById(schoolId, classId).toPromise();
  }

  async submit() {
   const result = await this.schoolService.createClassStatus(
      this.schoolService.getSelectedSchoolId(),
      this.class._id,
      { date: new Date() , class: this.class , statistics: this.statistics }
    ).toPromise();

    alert('نتایج ذخیره شد');
  }
}
