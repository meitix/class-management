import { Component, OnInit, EventEmitter } from '@angular/core';
import {
  IPeriod,
  Period
} from 'src/app/modules/school-management/models/edu/period.interface';
import { SchoolService } from '../../services/school.service';
import { ErrorService } from 'src/app/modules/base/services/error.service';

@Component({
  selector: 'app-period-create',
  templateUrl: './period-create.component.html',
  styleUrls: ['./period-create.component.css']
})
export class PeriodCreateComponent implements OnInit {
  period: IPeriod;
  isProcessing: boolean;
  updateDataEvent: EventEmitter<any>;

  constructor(
    private schoolService: SchoolService,
    private errorService: ErrorService
  ) {
    this.period = new Period();
    this.updateDataEvent = new EventEmitter<any>();
  }

  ngOnInit() {}

  async submit() {
    this.isProcessing = true;
    let request;

    if (this.period._id) {
      request = this.schoolService.updatePeriod(
        this.schoolService.getSelectedSchoolId(),
        this.period._id,
        this.period
      );
    } else {
      request = this.schoolService.createPeriod(
        this.schoolService.getSelectedSchoolId(),
        this.period
      );
    }
    try {
      const result = await request.toPromise();
      this.updateDataEvent.emit();
    } catch (e) {
      this.errorService.handle(e, 'مشکل در ثبت دوره');
    }
    this.period = new Period();
    this.isProcessing = false;
  }

  editPeriod(period: IPeriod) {
    this.period = period;
  }
}
