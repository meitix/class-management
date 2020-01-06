import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-student-start',
  templateUrl: './student-start.component.html',
  styleUrls: ['./student-start.component.css']
})
export class StudentStartComponent implements OnInit, OnDestroy {
  schoolIdSubscription: Subscription;
  schoolId: string;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.schoolIdSubscription = this.route.params.subscribe(params => {
      this.schoolId = params.id;
    });
  }
  navigateToList() {
    this.router.navigate([`/school/${this.schoolId}/student`]);
  }
  navigateToCreate() {
    this.router.navigate([`/school/${this.schoolId}/student/create`]);
  }

  ngOnDestroy() {
    this.schoolIdSubscription.unsubscribe();
  }
}
