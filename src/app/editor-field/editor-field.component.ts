import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../user.service';

export interface IUser {
  id: string;
  name: string;
}


@Component({
  selector: 'app-editor-field',
  templateUrl: './editor-field.component.html',
  styleUrls: ['./editor-field.component.scss']
})
export class EditorFieldComponent implements OnInit, AfterViewInit {

  allUsers: IUser[] = [];
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

  }

  onClosed() {
    this.moveCaret();
  }

  ngAfterViewInit(): void {
  }

  onCtrlEnter() {
    const text = this.field.nativeElement.innerText;
    console.log(text);
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
}
