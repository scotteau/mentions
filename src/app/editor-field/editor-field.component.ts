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
  currentSelectedUser: IUser;
  mentionedUsersById = new Set<string>();

  @ViewChild('textarea') field: ElementRef;

  constructor(private readonly userService: UserService) { }

  ngOnInit(): void {
    this.allUsers = this.userService.getUsers();
  }

  onItemSelected(user: IUser) {
    this.currentSelectedUser = user;
    this.mentionedUsersById.add(user.id);

    console.log(this.mentionedUsersById);
  }

  onClosed() {
    if (!this.currentSelectedUser) return;

    const separator = `@${this.currentSelectedUser.name}`;
    let tokens = this.field.nativeElement.innerHTML.split(separator);

    this.field.nativeElement.innerHTML = tokens.join(`<span style="background:crimson; padding: 0.25rem 0.5rem; color: white; border-radius: 1rem;">@${this.currentSelectedUser.name}</span>`) + "&nbsp";

    tokens.push(separator);
    this.currentSelectedUser = undefined;
    this.moveCaret();

    console.log(this.field.nativeElement.innerHTML);
  }

  private moveCaret():void {
    const el = this.field.nativeElement;
    // console.log(el.childNodes);
    // console.dir(el)

    const anchor = el.childNodes[el.childNodes.length-1]

    // console.log(anchor);

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
