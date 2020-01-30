import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-student',
  templateUrl: './manage-student.component.html',
  styleUrls: ['./manage-student.component.css']
})
export class ManageStudentComponent implements OnInit {
  @Input() schoolId: string;
  constructor(private router: Router) {}

  ngOnInit() {
    this.router.navigate(['school', this.schoolId, 'student']);
  }
}
