import { Component, OnInit } from '@angular/core';
import { SchoolService } from '../../../services/school.service';
import { IClass } from 'src/app/modules/school-management/models/edu/class.interface';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-statistics-create',
  templateUrl: './statistics-create.component.html',
  styleUrls: ['./statistics-create.component.css']
})
export class StatisticsCreateComponent implements OnInit {
  class: IClass;
  statistics: FormGroup[];
  constructor(
    private schoolService: SchoolService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.route.parent.params.pipe(take(1)).subscribe(async params => {
      if (params.id) {
        this.class = await this.fetchClassData(this.schoolService.getSelectedSchoolId(), params.id);
        this.statistics = this.createForm(this.class);
      }
    });
  }

  createForm(_class: IClass): FormGroup[] {
   const result = _class.students.map(student => new FormGroup({
        present: new FormControl(false),
        homework: new FormControl(false),
        lesson: new FormControl(false)
   }));
    console.log(result[0].controls);
    return result;
  }

  fetchClassData(schoolId: string, classId: string) {
    return this.schoolService.getClassById(schoolId, classId).toPromise();
  }
}
