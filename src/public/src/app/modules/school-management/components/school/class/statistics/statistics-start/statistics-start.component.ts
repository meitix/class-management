import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-statistics-start',
  templateUrl: './statistics-start.component.html',
  styleUrls: ['./statistics-start.component.css']
})
export class StatisticsStartComponent implements OnInit {
  schoolIdSubscription: Subscription;
  schoolId: string;
  classId: string;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.schoolIdSubscription = this.route.params.subscribe(params => {
      this.schoolId = params.id;
      this.classId = params.classId;
    });
  }
  navigateToList() {
    this.router.navigate([`/school/${this.schoolId}/classes/${this.classId}/statistics`]);
  }
  navigateToCreate() {
    this.router.navigate([`/school/${this.schoolId}/classes/${this.classId}/statistics/create`]);
  }

  ngOnDestroy() {
    this.schoolIdSubscription.unsubscribe();
  }
}
