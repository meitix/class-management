import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-students-statistics',
  templateUrl: './students-statistics.component.html',
  styleUrls: ['./students-statistics.component.css']
})
export class StudentsStatisticsComponent implements OnInit {
  constructor(private router: Router) {}
  @Input() schoolId: string;

  ngOnInit() {
    this.router.navigate(['school', this.schoolId, 'classes']);
  }
}
