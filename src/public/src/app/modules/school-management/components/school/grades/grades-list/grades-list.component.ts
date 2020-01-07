import { Component, OnInit } from '@angular/core';
import { IGrade } from 'src/app/modules/school-management/models/edu/grade.interface';
import { GradeService } from '../services/grade.service';

@Component({
  selector: 'app-grades-list',
  templateUrl: './grades-list.component.html',
  styleUrls: ['./grades-list.component.css']
})
export class GradesListComponent implements OnInit {
  grades: IGrade[];
  isLoading: boolean = true;
  constructor(private gradeService: GradeService) {
    this.grades = [];
  }

  ngOnInit() {
    this.fetchGridData();
  }

  fetchGridData() {
    this.gradeService.fetch().subscribe(res => {
      this.grades = res;
      this.isLoading = false;
    });
  }

  delete(id: string) {
    if (confirm('آیا برای حذف اطمینان دارید؟')) {
      this.gradeService.remove(id).subscribe(res => {
        alert('مورد با موفقیت حذف شد');
        this.fetchGridData();
      });
    }
  }
}
