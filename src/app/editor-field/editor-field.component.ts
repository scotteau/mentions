import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
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
export class EditorFieldComponent implements OnInit, AfterViewInit {

  allUsers: IUser[] = [];
  comment: ICommentToken[] = [];
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
    let tokens = this.field.nativeElement.innerHTML.split(separator);

    this.field.nativeElement.innerHTML = tokens.join(`<strong>@${this.selectedUser.name}</strong>`) + "&nbsp";

    tokens.push(separator);
    this.selectedUser = undefined;
    this.moveCaret();
  }

  private moveCaret():void {
    const el = this.field.nativeElement;
    console.log(el.childNodes);
    console.dir(el)

    const anchor = el.childNodes[el.childNodes.length-1]

    console.log(anchor);

    let range = document.createRange();
    let selection = window.getSelection();

    range.setStartAfter(anchor);
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);
  }

  ngAfterViewInit(): void {
  }
}
