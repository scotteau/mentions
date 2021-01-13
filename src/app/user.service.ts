import { Injectable } from '@angular/core';
import * as fakerStatic from 'faker';
import {IUser} from './editor-field/editor-field.component';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  getUsers(): IUser[] {

    const result = [];
    for (let i = 0; i < 50; i++) {
      const user: IUser = {
        name: `${fakerStatic.name.firstName()} ${fakerStatic.name.lastName()}`,
        id: fakerStatic.random.uuid()
      }
      result.push(user);
    }
    return result;

  }
}
