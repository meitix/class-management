import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-class',
  templateUrl: './manage-class.component.html',
  styleUrls: ['./manage-class.component.css']
})
export class ManageClassComponent implements OnInit {
  @Input() schoolId: string;
  constructor(private router: Router) {}

  ngOnInit() {
    this.router.navigate(['school', this.schoolId, 'classes']);
  }
}
