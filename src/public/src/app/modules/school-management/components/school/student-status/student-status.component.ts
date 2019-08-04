import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SchoolService } from '../services/school.service';

@Component({
  selector: 'app-student-status',
  templateUrl: './student-status.component.html',
  styleUrls: ['./student-status.component.css']
})
export class StudentStatusComponent implements OnInit {

  constructor(private route: ActivatedRoute , private schoolService: SchoolService) { }

  ngOnInit() {
  }

}
