import { Component, OnInit, OnDestroy } from '@angular/core';
import { IClass } from 'src/app/modules/school-management/models/edu/class.interface';
import { SchoolService } from '../../services/school.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-class-list',
  templateUrl: './class-list.component.html',
  styleUrls: ['./class-list.component.css']
})
export class ClassListComponent implements OnInit, OnDestroy {
  classes: IClass[];
  schoolIdSubscription: Subscription;
  schoolId: string;
  periodChangeSubscription: Subscription;

  constructor(
    private schoolService: SchoolService,
    private route: ActivatedRoute
  ) {
    this.classes = [];
  }

  ngOnInit() {
    // get school id from route.
    this.schoolIdSubscription = this.route.parent.params.subscribe(params => {
      this.schoolId = params.id;
    });
    this.fetchGridData();

    // listen to period change.
    this.periodChangeSubscription = this.schoolService.periodSelected.subscribe(
      () => {
        this.fetchGridData();
      }
    );
  }

  fetchGridData() {
    this.schoolService
      .getClassesBySchoolId(
        this.schoolId,
        this.schoolService.getSelectedPeriod()._id
      )
      .subscribe(res => {
        this.classes = res;
      });
  }

  delete(id: string) {
    if (confirm('آیا برای حذف اطمینان دارید؟')) {
      this.schoolService.remove(id).subscribe(res => {
        alert('مورد با موفقیت حذف شد');
        this.fetchGridData();
      });
    }
  }

  ngOnDestroy() {
    this.schoolIdSubscription.unsubscribe();
    if (this.periodChangeSubscription) {
      this.periodChangeSubscription.unsubscribe();
    }
  }
}
