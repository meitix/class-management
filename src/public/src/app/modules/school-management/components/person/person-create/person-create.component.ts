import {
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
  Input,
  EventEmitter,
  OnChanges,
  Output
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { ErrorService } from 'src/app/modules/base/services/error.service';
import { IPerson, Person } from '../../../models/people/person.interface';
import { PersonService } from '../services/person.service';
import * as moment from 'jalali-moment';
@Component({
  selector: 'app-person-create',
  templateUrl: './person-create.component.html',
  styleUrls: ['./person-create.component.css']
})
export class PersonCreateComponent implements OnInit, OnChanges, OnDestroy {
  @Output() personUpdate: EventEmitter<IPerson>;

  @Input() person: IPerson;
  @Input() enableSubmit: boolean;
  @ViewChild('f') form: NgForm;

  constructor(
    private personService: PersonService,
    private errorService: ErrorService
  ) {
    this.personUpdate = new EventEmitter<IPerson>();
    this.person = new Person();
  }

  ngOnInit() {
    this.person.birthDate = moment(this.person.birthDate).format(
      'YYYY/MM/DD h:mm:ss'
    );
    this.person.birthDate = moment.from(
      this.person.birthDate,
      'en',
      'YYYY/MM/DD'
    );
  }

  submit(f: NgForm) {
    if (f.valid) {
      let request = this.personService.create(this.person);

      // change request to update if user is updating.
      if (this.person._id) {
        request = this.personService.update(this.person._id, this.person);
      }

      request.subscribe(
        res => {
          this.person = res;
          alert(
            this.person.firstname +
              ' ' +
              this.person.lastname +
              ` با موفقیت ثبت شد`
          );
        },
        err => this.errorService.handle(err, 'خطا.')
      );
    }
  }

  formChange() {
    this.personUpdate.emit(this.person);
  }

  ngOnDestroy(): void {}

  ngOnChanges(): void {
    this.form.valueChanges.subscribe(values => {
      this.formChange();
    });
  }
}
