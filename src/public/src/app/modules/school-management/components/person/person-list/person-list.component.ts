import { Component, OnInit, Input, Output } from '@angular/core';
import { IPerson } from '../../../models/people/person.interface';
import { EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnInit {
  @Input() people: Array<IPerson>;
  // tslint:disable-next-line: no-output-rename
  @Output('delete') deleteEvent: EventEmitter<any>;
  schoolIdSubscription: Subscription;
  schoolId: string;
  constructor(private router: Router, private route: ActivatedRoute) {
    this.deleteEvent = new EventEmitter();
  }

  ngOnInit() {
    this.schoolIdSubscription = this.route.params.subscribe(params => {
      this.schoolId = params.id;
    });
  }
  navigateToEdit(id) {
    this.router.navigate([`${this.router.url}/edit/${id}`]);
  }
  delete(person: any) {
    this.deleteEvent.emit(person);
  }
}
