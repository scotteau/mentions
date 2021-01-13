import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';

export interface IUser {
  id: string;
  name: string;
}

export interface ICommentToken {
  type: 'text' | 'mention';
  content: string;
  index: number;
  payload?: any;
}

@Component({
  selector: 'app-editor-field',
  templateUrl: './editor-field.component.html',
  styleUrls: ['./editor-field.component.scss']
})
export class EditorFieldComponent implements OnInit {

  allUsers: IUser[] = [];
  comment: ICommentToken[] = [];
  constructor(private readonly userService: UserService) { }

  ngOnInit(): void {
    this.allUsers = this.userService.getUsers();
  }

}
