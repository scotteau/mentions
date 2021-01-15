import { Injectable } from '@angular/core';
import * as fakerStatic from 'faker';

// displayName: "Craig Summer"
// email: "craig.summer@silverhorsetech.com"
// id: "7673B526-68A1-4C27-A4FD-00079B8F20AD"
// username: "CSummer"

export interface IUser {
  id: string;
  username: string;
  email: string;
  displayName: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  getUsers(): IUser[] {

    const result = [];
    for (let i = 0; i < 50; i++) {
      const firstName = fakerStatic.name.firstName();
      const lastName = fakerStatic.name.lastName();
      const user: IUser = {
        displayName: `${firstName} ${lastName}`,
        id: fakerStatic.random.uuid(),
        email: fakerStatic.internet.email(firstName, lastName, 'silverhorsetech.com'),
        username: `${firstName[0]}${lastName}`
      }
      result.push(user);
    }
    return result;

  }
}
