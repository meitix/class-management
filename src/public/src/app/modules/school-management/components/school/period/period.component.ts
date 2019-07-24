import { Component, OnInit, OnDestroy } from '@angular/core';
import { SchoolService } from '../services/school.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { IPeriod, Period } from '../../../models/edu/period.interface';

@Component({
  selector: 'app-period',
  templateUrl: './period.component.html',
  styleUrls: ['./period.component.css']
})
export class PeriodComponent implements OnInit, OnDestroy {
  schoolIdSubscription: Subscription;
  navigationEndSubscription: Subscription;
  periods: IPeriod[];
  schoolId: string;
  selectedPeriod: IPeriod;

  constructor(
    private schoolService: SchoolService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.selectedPeriod = new Period();
    this.selectedPeriod.title = 'انتخاب دوره';
  }

  ngOnInit() {
    this.navigationEndSubscription = this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        // get school id from url - it's in the 3rd child params.
        try {
          this.schoolIdSubscription = this.route.children[0].children[0].children[0].params.subscribe(
            params => {
              if (params.id) {
                this.schoolService.selectSchool(params.id);
                this.schoolId = params.id;
                // if there is no list of periods get list of period or school id has been changed fetch the periods.
                if (!this.periods || this.schoolService.getSelectedSchoolId() !== this.schoolId) {
                  this.getPeriods(this.schoolId);
                }
              } else {
                this.periods = undefined;
              }
            }
          );
        } catch {}
      });
  }

  async getPeriods(schoolId: string) {
    this.periods = await this.schoolService
      .getPeriodsBySchoolId(schoolId)
      .toPromise();

    // select the current period;
    this.selectDefaultPeriod();
  }

  selectDefaultPeriod() {
    // initial default period.
    const period = this.schoolService.getSelectedPeriod();
    if (!period && this.periods.length) {
      this.selectedPeriod = this.periods[0];
    } else {
      this.selectedPeriod = this.periods.find(p => p._id === period._id);
    }

    // share the selected period through school service.
    this.schoolService.setSelectedPeriod(this.selectedPeriod);
  }

  // handles change period event when user change it from UI.
  selectPeriod(period: IPeriod) {
    this.selectedPeriod = period;
    this.schoolService.setSelectedPeriod(period);
  }

  ngOnDestroy() {
    this.schoolIdSubscription.unsubscribe();
    this.navigationEndSubscription.unsubscribe();
  }
}
