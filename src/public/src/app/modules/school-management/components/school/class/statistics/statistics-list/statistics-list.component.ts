import { Component, OnInit } from '@angular/core';
import { SchoolService } from '../../../services/school.service';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-statistics-list',
  templateUrl: './statistics-list.component.html',
  styleUrls: ['./statistics-list.component.css']
})
export class StatisticsListComponent implements OnInit {
  statuses: any = [];
  isLoading: boolean = true;
  constructor(
    private schoolService: SchoolService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.pipe(take(1)).subscribe(async params => {
      this.statuses = await this.getStatuses( params.classId );
      this.isLoading = false;
    });
  }

  async getStatuses(classId: string) {
    return await this.schoolService
      .getClassStatus(this.schoolService.getSelectedSchoolId(), classId)
      .toPromise();
  }
}
