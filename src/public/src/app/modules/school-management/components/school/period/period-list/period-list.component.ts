import {
  Component,
  OnInit,
  EventEmitter,
  Input,
  OnDestroy,
  Output
} from '@angular/core';
import { IPeriod } from 'src/app/modules/school-management/models/edu/period.interface';
import { SchoolService } from '../../services/school.service';
import { ErrorService } from 'src/app/modules/base/services/error.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-period-list',
  templateUrl: './period-list.component.html',
  styleUrls: ['./period-list.component.css']
})
export class PeriodListComponent implements OnInit, OnDestroy {
  periods: IPeriod[];

  @Input() updateData: EventEmitter<void>;
  updateDataSubscription: Subscription;

  // modify data events.
  @Output() editPeriod: EventEmitter<IPeriod>;

  constructor(
    private schoolService: SchoolService,
    private errorService: ErrorService
  ) {
    this.periods = [];
    this.editPeriod = new EventEmitter<IPeriod>();
  }

  ngOnInit() {
    this.fetchPeriods();
    // subscribe to update data event.
    this.updateDataSubscription = this.updateData.subscribe(() => {
      this.fetchPeriods();
    });
  }

  async fetchPeriods() {
    try {
      this.periods = await this.schoolService
        .getPeriodsBySchoolId(this.schoolService.getSelectedSchoolId())
        .toPromise();
    } catch (e) {
      this.errorService.handle(e, 'مشکل در دریافت دوره ها');
    }
  }

  edit(period: IPeriod) {
    this.editPeriod.emit(period);
  }

  async delete(period: IPeriod) {
    if (confirm('آیا از حذف ای دوره مطمئنید؟')) {
      await this.schoolService
        .deletePeriod(this.schoolService.getSelectedSchoolId(), period._id)
        .toPromise();
      // update the list;
      this.fetchPeriods();
    }
  }

  ngOnDestroy() {
    this.updateDataSubscription.unsubscribe();
  }
}
