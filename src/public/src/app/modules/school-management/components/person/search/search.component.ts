import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { IPerson } from '../../../models/people/person.interface';
import { PersonService } from '../services/person.service';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { SchoolService } from '../../school/services/school.service';
import { auditTime } from 'rxjs/operators';

@Component({
  selector: 'app-person-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit , OnDestroy {

  @Output() personSelect: EventEmitter<IPerson>;
  searchTerm: FormControl = new FormControl();
  people: Array<IPerson>;
  searchInputSubscription: Subscription;
  schoolIdSubscription: Subscription;
  schoolId: string;

  constructor(private personService: SchoolService, private route: ActivatedRoute) {
    this.personSelect = new EventEmitter<IPerson>();
    this.people = [];
  }

  ngOnInit() {
    this.schoolIdSubscription = this.route.parent.params.subscribe(params => {
      this.schoolId = params.id;
    });
    // bind person search value change subscription.
    this.bindPersonInputSearch();

  }

  // binding person search subscriber to record the search input value changes.
  bindPersonInputSearch() {
   this.searchInputSubscription = this.searchTerm.valueChanges.pipe(auditTime(500)).subscribe((term: string) => {
      if (term) {
        this.personSearch(term);
      }
    });
  }
  // do the person search and fill the persons property by result.
  async personSearch(term: string) {
   this.people = await this.personService.searchPersonnel(this.schoolId , term).toPromise();
  }

  selectPerson(person: IPerson) {
    this.personSelect.emit(person);
  }

  ngOnDestroy(): void {
    this.searchInputSubscription.unsubscribe();
    this.schoolIdSubscription.unsubscribe();
  }
}
