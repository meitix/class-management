import {
  Component,
  OnInit,
  OnDestroy,
  Injector,
  Output,
  Input
} from '@angular/core';
import { SchoolService } from '../services/school.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { IPeriod } from '../../../models/edu/period.interface';
import { EventEmitter } from '@angular/core';

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

  constructor(
    private schoolService: SchoolService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

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
                this.getPeriods(this.schoolId);
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
  }

  ngOnDestroy() {
    this.schoolIdSubscription.unsubscribe();
    this.navigationEndSubscription.unsubscribe();
  }
}
