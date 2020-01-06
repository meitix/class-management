import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-personnel-start',
  templateUrl: './personnel-start.component.html',
  styleUrls: ['./personnel-start.component.css']
})
export class PersonnelStartComponent implements OnInit {
  schoolIdSubscription: Subscription;
  schoolId: string;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.schoolIdSubscription = this.route.params.subscribe(params => {
      this.schoolId = params.id;
    });
  }
  navigateToList() {
    this.router.navigate([`/school/${this.schoolId}/personnel`]);
  }
  navigateToCreate() {
    this.router.navigate([`/school/${this.schoolId}/personnel/create`]);
  }

  ngOnDestroy() {
    this.schoolIdSubscription.unsubscribe();
  }
}
