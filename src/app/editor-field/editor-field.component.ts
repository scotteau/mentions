import {Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {UserService} from '../user.service';

export interface IUser {
  id: string;
  name: string;
}

export interface ICommentToken {
  type: 'text' | 'mention';
  content: string;
  payload?: IUser | any;
}

@Component({
  selector: 'app-editor-field',
  templateUrl: './editor-field.component.html',
  styleUrls: ['./editor-field.component.scss']
})
export class EditorFieldComponent implements OnInit {

  allUsers: IUser[] = [];
  comment: ICommentToken[] = [];
  content: string;
  selectedUser: IUser;
  @ViewChild('textarea') field: ElementRef;

  constructor(private readonly userService: UserService) { }

  ngOnInit(): void {
    this.allUsers = this.userService.getUsers();
  }

  onItemSelected(user: IUser) {
    this.selectedUser = user;
  }

  onClosed() {
    if (!this.selectedUser) return;

    const separator = `@${this.selectedUser.name}`;
    const tokenized = this.field.nativeElement.innerHTML.split(separator);

    this.content = tokenized.join(`<strong>@${this.selectedUser.name}</strong> `);

    console.log(this.content);
    this.field.nativeElement.innerHTML = this.content;

    tokenized.push(separator);
    this.selectedUser = undefined;
  }
}
