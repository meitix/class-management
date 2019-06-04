import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'activeStatus'
})
export class ActiveStatusPipe implements PipeTransform {

  transform(value: boolean): any {
    return value ? '<span class="text-success">فعال</span>' : '<span class="text-danger">غیر فعال</span>';
  }
}
