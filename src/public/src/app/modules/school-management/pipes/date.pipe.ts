import { Pipe, PipeTransform } from '@angular/core';
import * as PersianDate from 'persian-date';

@Pipe({
  name: 'date'
})
export class DatePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return new PersianDate(value).toLocale('fa').format('YY / MM / DD');
  }
}
