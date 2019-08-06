import { Component, OnInit } from '@angular/core';
import { SchoolService } from '../../services/school.service';

@Component({
  selector: 'app-class-status',
  templateUrl: './class-status.component.html',
  styleUrls: ['./class-status.component.css']
})
export class ClassStatusComponent implements OnInit {

  constructor(private schoolService: SchoolService) { }

  ngOnInit() {
  }

}
