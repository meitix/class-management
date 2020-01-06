import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-class-start',
  templateUrl: './class-start.component.html',
  styleUrls: ['./class-start.component.css']
})
export class ClassStartComponent implements OnInit {
  schoolIdSubscription: Subscription;
  schoolId: string;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.schoolIdSubscription = this.route.params.subscribe(params => {
      this.schoolId = params.id;
    });
  }
  navigateToList() {
    this.router.navigate([`/school/${this.schoolId}/classes`]);
  }
  navigateToCreate() {
    this.router.navigate([`/school/${this.schoolId}/classes/create`]);
  }

  ngOnDestroy() {
    this.schoolIdSubscription.unsubscribe();
  }
}
