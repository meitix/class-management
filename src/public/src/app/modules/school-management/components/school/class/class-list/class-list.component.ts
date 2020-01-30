import { Component, OnInit, OnDestroy } from '@angular/core';
import { IClass } from 'src/app/modules/school-management/models/edu/class.interface';
import { SchoolService } from '../../services/school.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/modules/authentication/services/auth.service';

@Component({
  selector: 'app-class-list',
  templateUrl: './class-list.component.html',
  styleUrls: ['./class-list.component.css']
})
export class ClassListComponent implements OnInit, OnDestroy {
  classes: IClass[];
  schoolIdSubscription: Subscription;
  schoolId: string;
  periodChangeSubscription: Subscription;
  isLoading: boolean = true;
  rolehasPermitforHaveAllclasses;
  currentUser;

  constructor(
    private schoolService: SchoolService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {
    this.classes = [];
  }

  ngOnInit() {
    // get school id from route.
    this.schoolIdSubscription = this.route.params.subscribe(params => {
      this.schoolId = params.id;
    });

    this.checkRolePermitforHaveAllclasses();

    this.fetchGridData();

    // listen to period change.
    this.periodChangeSubscription = this.schoolService.periodSelected.subscribe(
      () => {
        this.fetchGridData();
      }
    );
  }

  fetchGridData() {
    if (this.schoolService.getSelectedPeriod()) {
      this.schoolService
        .getClassesBySchoolId(
          this.schoolId,
          this.schoolService.getSelectedPeriod()._id
        )
        .subscribe(res => {
          if (this.rolehasPermitforHaveAllclasses) {
            this.classes = res;
          } else {
            this.classes = res.filter(f => {
              return f.teacher._id === this.currentUser.id;
            });
          }

          this.isLoading = false;
        });
    }
  }

  delete(id: string) {
    if (confirm('آیا برای حذف اطمینان دارید؟')) {
      this.schoolService.remove(id).subscribe(res => {
        alert('مورد با موفقیت حذف شد');
        this.fetchGridData();
      });
    }
  }

  checkRolePermitforHaveAllclasses()
  {
    this.currentUser = this.authService.getCurrentUser();
    this.rolehasPermitforHaveAllclasses = this.currentUser.roles.map(f => {
      if (
        f.title === 'ادمین' ||
        f.title === 'مدیریت اموزش' ||
        f.title === 'ادمین کل'
      ) {
        return true;
      } else {
        return false;
      }
    });
    if (this.rolehasPermitforHaveAllclasses.includes(true))
      return (this.rolehasPermitforHaveAllclasses = true);
    else this.rolehasPermitforHaveAllclasses = false;

  }

  ngOnDestroy() {
    this.schoolIdSubscription.unsubscribe();
    if (this.periodChangeSubscription) {
      this.periodChangeSubscription.unsubscribe();
    }
  }
}
