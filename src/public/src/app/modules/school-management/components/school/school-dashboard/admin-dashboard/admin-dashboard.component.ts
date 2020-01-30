import { Component, OnInit, Input } from '@angular/core';
import { SchoolService } from '../../services/school.service';
import { ISchool } from 'src/app/modules/school-management/models/edu/school.interface';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  @Input() schoolId: string;
  schools: ISchool[];
  isLoading: boolean = true;

  constructor(private schoolService: SchoolService) {
    this.schools = [];
  }

  ngOnInit() {
    this.fetchGridData(this.schoolId);
  }

  async fetchGridData(id) {
    let res = await this.schoolService.fetchById(id).toPromise();
    this.schools.push(res);
    this.isLoading = false;
  }
}
