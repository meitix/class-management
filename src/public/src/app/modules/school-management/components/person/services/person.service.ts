import { Injectable, Injector } from '@angular/core';
import { RestService } from 'src/app/modules/base/services/rest.service';
import { IPerson } from '../../../models/people/person.interface';

@Injectable({
  providedIn: 'root'
})
export class PersonService extends RestService<IPerson> {


  constructor(injector: Injector) {
    super('person' , injector);
  }

}
