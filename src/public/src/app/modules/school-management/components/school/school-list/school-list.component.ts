import { Component, OnInit } from '@angular/core';
import { SchoolService } from '../services/school.service';
import { ISchool } from '../../../models/edu/school.interface';

@Component({
  selector: 'app-school',
  templateUrl: './school-list.component.html',
  styleUrls: ['./school-list.component.css']
})
export class SchoolListComponent implements OnInit {

  schools: ISchool[];
  constructor(private schoolService: SchoolService) { }

  ngOnInit() {
   this.fetchGridData();
  }

  fetchGridData() {
    this.schoolService.fetch().subscribe(res => {
      this.schools = res;
    });
  }

  delete(id: string) {
    if (confirm('آیا برای حذف اطمینان دارید؟')) {
      this.schoolService.delete(id).subscribe(res => {
        alert('مورد با موفقیت حذف شد');
        this.fetchGridData();
      });
    }
  }
}
