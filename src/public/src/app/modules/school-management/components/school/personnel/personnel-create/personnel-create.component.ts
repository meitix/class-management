import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import {
  IPerson,
  Person
} from 'src/app/modules/school-management/models/people/person.interface';
import { SchoolService } from '../../services/school.service';
import { ActivatedRoute } from '@angular/router';
import { ErrorService } from 'src/app/modules/base/services/error.service';

// select2.
import { Options } from 'select2';
import { RoleService } from 'src/app/modules/authentication/services/role.service';

@Component({
  selector: 'app-personnel-create',
  templateUrl: './personnel-create.component.html',
  styleUrls: ['./personnel-create.component.css']
})
export class PersonnelCreateComponent implements OnInit, OnDestroy {
  isProcessing: boolean;
  isLoading: boolean = false;

  schoolId: string;
  personId: string;
  roleIds: string[];

  person: IPerson;
  schoolIdSubscription: Subscription;
  personIdSubscription: Subscription;

  public select2Options: Options;
  roles = [];
  constructor(
    private schoolService: SchoolService,
    private route: ActivatedRoute,
    private errorService: ErrorService,
    private roleService: RoleService
  ) {
    this.person = new Person();
  }

  ngOnInit() {
    // get school id from route.
    this.schoolIdSubscription = this.route.parent.params.subscribe(params => {
      this.schoolId = params.id;
    });
    // get person id from route.
    this.personIdSubscription = this.route.params.subscribe(async params => {
      // didn't use parent on route object so in path '/person/:id' we need to read the id parameter.
      this.personId = params.personnelId;
      if (this.personId) {
        await this.fetchPersonnel(this.personId);
      }
     
    });

    // load roles from server.
    this.getRoles();
    // select 2 options.

    this.roleIds = [];

    this.select2Options = {
      width: '300',
      multiple: true
    };
  }
  async fetchPersonnel( personId: string )
  {
    this.isLoading = true;
    const data = await this.schoolService
      .getSinglePersonnel(this.schoolId, personId)
      .toPromise();
      this.isLoading = false;
    this.person = data.person;

    this.roleIds = data.roles.map(r => r._id);
  }

  // get available roles from server.
  async getRoles() {
    const roles = await this.roleService.fetch().toPromise();
    this.roles = roles.map(r => ({ id: r._id, text: r.title }));
  }

  async submit() {
    this.isProcessing = true;

    let req = this.schoolService.addPersonnel(
      this.schoolId,
      this.person,
      this.roleIds
    );
    if (this.personId) {
      req = this.schoolService.updatePersonnel(
        this.schoolId,
        this.personId,
        this.person,
        this.roleIds
      );
    }
    try {
      const res = await req.toPromise();
      this.isProcessing = false;
      alert('پرسنل با موفقیت ثبت شد');
    } catch (e) {
      this.errorService.handle(e, 'مشکل در اتصال به سرور');
    }
  }

  updatePerson(person: IPerson) {
    if (person) {
      this.person = person;
    }
  }

  ngOnDestroy(): void {
    this.schoolIdSubscription.unsubscribe();
    this.personIdSubscription.unsubscribe();
  }
}
