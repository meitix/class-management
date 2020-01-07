import { Component, OnInit } from '@angular/core';
import { SchoolService } from '../../../services/school.service';
import {
  IClass,
  Class
} from 'src/app/modules/school-management/models/edu/class.interface';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { IStatistics, IClassStatus } from 'src/app/modules/school-management/models/edu/statistics.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-statistics-create',
  templateUrl: './statistics-create.component.html',
  styleUrls: ['./statistics-create.component.css']
})
export class StatisticsCreateComponent implements OnInit {
  class: IClass;
  statistics: IStatistics;
  isUpdateMode = false;
  status: IClassStatus;
  isLoading: boolean = true;

  constructor(
    private schoolService: SchoolService,
    private route: ActivatedRoute
  ) {
    this.class = new Class();
  }

  ngOnInit() {
    this.route.parent.params.pipe(take(1)).subscribe(async params => {
      if (params.id) {
        this.class = await this.loadClassData(params.classId);
        this.statistics = this.createForm(this.class);

        // load saved statuses in edit mode.
        this.route.params.pipe(take(1)).subscribe(async currentParams => {
          if (currentParams.statusId) {
            this.isUpdateMode = true;
            // load saved status from server.
            this.status = await this.loadClassStatuses(
              this.schoolService.getSelectedSchoolId(),
              params.id,
              currentParams.statusId
            ).toPromise();
            // bind saved status values to class statistics.
            this.bindSavedStatuses(this.statistics , this.status.statistics);
          }
        });
      }
      this.isLoading = false;
    });
  }

  loadClassData(id: string) {
    return this.fetchClassData(this.schoolService.getSelectedSchoolId(), id);
  }

  loadClassStatuses(schoolId: string, classId: string, statusId: string) {
    return this.schoolService.getStatusById(schoolId, classId, statusId);
  }

  bindSavedStatuses(target , values: IStatistics) {
    target = target.map((status , i) => {
      const result = values.find(v => v.student === status.student._id);
      if (result) {
        status.result = values[i].result;
      }

      return status;
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
    let request: Observable<object>;
    if (this.isUpdateMode) {
     request = this.schoolService.updateStatistics(this.schoolService.getSelectedSchoolId(), this.class._id , this.status._id , this.statistics);
    } else {
     request = this.schoolService
      .createClassStatus(
        this.schoolService.getSelectedSchoolId(),
        this.class._id,
        { date: new Date(), class: this.class, statistics: this.statistics }
      );
    }

    const result = await request.toPromise();

    alert('نتایج ذخیره شد');
  }
}
