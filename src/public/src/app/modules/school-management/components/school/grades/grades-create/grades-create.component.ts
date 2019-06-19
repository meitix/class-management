import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import {
  IGrade,
  Grade
} from 'src/app/modules/school-management/models/edu/grade.interface';
import { ErrorService } from 'src/app/modules/base/services/error.service';
import { ActivatedRoute } from '@angular/router';
import { GradeService } from '../services/grade.service';
import {
  ILesson,
  Lesson
} from 'src/app/modules/school-management/models/edu/lesson.interface';

@Component({
  selector: 'app-grades-create',
  templateUrl: './grades-create.component.html',
  styleUrls: ['./grades-create.component.css']
})
export class GradesCreateComponent implements OnInit, OnDestroy {
  isProcessing: boolean;
  gradeId: string;
  newLesson: ILesson;

  grade: IGrade;
  gradeIdSubscription: Subscription;

  constructor(
    private gradeService: GradeService,
    private route: ActivatedRoute,
    private errorService: ErrorService
  ) {
    this.grade = new Grade();
    this.newLesson = new Lesson();
    // init lessons array.
    this.grade.lessons = this.grade.lessons || [];
  }
  ngOnInit() {
    // get grade id from route.
    this.gradeIdSubscription = this.route.params.subscribe(params => {
      // didn't use parent on route object so in path '/grade/:id' we need to read the id parameter.
      this.gradeId = params.id;
      if (this.gradeId) {
        this.fetchGrade(this.gradeId);
      }
    });
  }
  async fetchGrade(gradeId: string) {
    this.grade = await this.gradeService.fetchById(gradeId).toPromise();
  }

  async submit() {
    let req = this.gradeService.create(this.grade);
    if (this.gradeId) {
      req = this.gradeService.update(this.gradeId, this.grade);
    }
    try {
    this.isProcessing = true;
      const res = await req.toPromise();
      this.isProcessing = false;
      alert('پایه با موفقیت ثبت شد');
    } catch (e) {
      this.errorService.handle(e, 'مشکل در اتصال به سرور');
    }
  }


  saveLesson() {
    // check empty title.
    if (!this.newLesson.title) {
      alert('لطفا برای درس عنوانی وارد کنید');
      return;
    }
    // check duplicate lesson.
    if (
      this.grade.lessons.findIndex(l => l.title === this.newLesson.title) > -1
    ) {
      alert('این درس قبلا ثبت شده است');
      return;
    }
    // save new lesson.
    this.grade.lessons.push(this.newLesson);
    // reset the new lesson form.
    this.newLesson = new Lesson();
  }


  // delete the lesson.
  deleteLesson(lesson: ILesson) {
    if (confirm('آیا از حذف ' + lesson.title + ' اطمینان دارید؟')) {
      this.grade.lessons = this.grade.lessons.filter(
        l => l.title !== lesson.title
      );
    }
  }

  ngOnDestroy(): void {
    this.gradeIdSubscription.unsubscribe();
  }
}
