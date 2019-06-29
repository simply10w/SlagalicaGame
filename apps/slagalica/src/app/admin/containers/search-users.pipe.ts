import { Pipe, PipeTransform } from '@angular/core';
import { User } from '@slagalica/data';
import { filter } from 'lodash';

@Pipe({
  name: 'slaSearchUsers'
})
export class SearchUsersPipe implements PipeTransform {
  transform(users: User[], query: string = ''): any {
    return filter(users, user =>
      `${user.firstName} ${user.lastName} ${user.email} ${user.userName}`
        .toLowerCase()
        .includes(query.toLowerCase())
    );
  }
}
