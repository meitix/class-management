import { Component, OnInit } from '@angular/core';
import {
  AuthService,
  ILoginResult
} from 'src/app/modules/authentication/services/auth.service';
import { flatten } from 'lodash';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-school-dashboard',
  templateUrl: './school-dashboard.component.html',
  styleUrls: ['./school-dashboard.component.css']
})
export class SchoolDashboardComponent implements OnInit {
  currentUser: ILoginResult;
  currentRoles = [];
  schoolIdSubscription: Subscription;
  schoolId: string;
  manageClass: boolean;
  studentsStatistics: boolean;
  managePersonnel: boolean;
  manageSchoolUP: boolean;
  manageClassUP: boolean;
  studentsStatisticsUP: boolean;
  managePersonnelUP: boolean;
  manageStudentsUP: boolean;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.schoolIdSubscription = this.route.params.subscribe(params => {
      this.schoolId = params.id;
    });
    this.currentUser = this.authService.getCurrentUser();
    this.currentRoles = flatten(
      this.currentUser.roles.map(r => r.accessibility)
    );

    this.currentRoles.find(r => {
      if (r.title === 'manage-school') {
        return (this.manageSchoolUP = true);
      } else {
        if (r.title === 'manage-class') {
          this.manageClass = true;
        } else if (r.title === 'manage-class-statistics') {
          this.studentsStatistics = true;
        }
        if (r.title === 'manage-personnel') {
          this.managePersonnel = true;
        }
      }
    });
  }

  turnOnStudentsStatistics() {
    this.studentsStatisticsUP = true;
    this.manageSchoolUP = false;
    this.manageClassUP = false;
    this.managePersonnelUP = false;
    this.manageStudentsUP = false;
  }
  turnOnManagePersonnel() {
    this.studentsStatisticsUP = false;
    this.manageSchoolUP = false;
    this.manageClassUP = false;
    this.managePersonnelUP = true;
    this.manageStudentsUP = false;
  }
  turnOnManageClasses() {
    this.studentsStatisticsUP = false;
    this.manageSchoolUP = false;
    this.manageClassUP = true;
    this.manageStudentsUP = false;
    this.managePersonnelUP = false;
  }
  turnOnManageStudents() {
    this.studentsStatisticsUP = false;
    this.manageSchoolUP = false;
    this.manageClassUP = false;
    this.manageStudentsUP = true;
    this.managePersonnelUP = false;
  }
  // turnOnManageSchool() {
  //   this.studentsStatisticsUP = false;
  //   this.manageSchoolUP = true;
  //   this.manageClassUP = false;
  //   this.manageStudentsUP = false;
  //   this.managePersonnelUP = false;
  // }
}
