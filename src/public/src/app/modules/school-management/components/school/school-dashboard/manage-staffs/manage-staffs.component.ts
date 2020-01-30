import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-staffs',
  templateUrl: './manage-staffs.component.html',
  styleUrls: ['./manage-staffs.component.css']
})
export class ManageStaffsComponent implements OnInit {
  @Input() schoolId: string;

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.navigate(['school', this.schoolId, 'personnel']);
  }
}
