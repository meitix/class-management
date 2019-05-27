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
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ErrorService } from 'src/app/modules/base/services/error.service';
import { IPerson, Person } from '../../../models/people/person.interface';
import { PersonService } from '../services/person.service';

@Component({
  selector: 'app-person-create',
  templateUrl: './person-create.component.html',
  styleUrls: ['./person-create.component.css']
})
export class PersonCreateComponent implements OnInit, OnChanges, OnDestroy {
  routeSubscription: Subscription;
  @Output() personUpdate: EventEmitter<IPerson>;

  @Input() person: IPerson;
  @Input() enableSubmit: boolean;
  @ViewChild('f') form: NgForm;

  constructor(
    private personService: PersonService,
    private route: ActivatedRoute,
    private errorService: ErrorService
  ) {
    this.personUpdate = new EventEmitter<IPerson>();
  }

  ngOnInit() {
    console.log(this.person);
    this.routeSubscription = this.route.params.subscribe(async params => {
      console.log(params.id);
      if (params.id) {
        // fetch person data.
        try {
          this.person = await this.personService
            .fetchById(params.id)
            .toPromise();
        } catch (e) {
          this.errorService.handle(e, 'مشکل در بارگزاری اطلاعات');
        }
      } else {
        this.person = new Person();
      }
    });
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

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }

  ngOnChanges(): void {
    this.form.valueChanges.subscribe(values => {
      this.formChange();
    });
  }
}
