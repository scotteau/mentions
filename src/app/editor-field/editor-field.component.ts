import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {IUser, UserService} from '../user.service';

@Component({
  selector: 'app-editor-field',
  templateUrl: './editor-field.component.html',
  styleUrls: ['./editor-field.component.scss']
})
export class EditorFieldComponent implements OnInit, AfterViewInit {

  allUsers: IUser[] = [];
  currentSelectedUser: IUser;
  mentionedUsersById = new Set<string>();
  pattern = /[@#][\w'\-,.]{2,}[^0-9_!¡?÷?¿\\+=@#$%ˆ&*(){}|~<>;:[\]][\w'\-,.]{2,}/g;

  @ViewChild('textarea') field: ElementRef;

  constructor(private readonly userService: UserService) {
  }

  ngOnInit(): void {
    this.allUsers = this.userService.getUsers();

    console.log(this.allUsers);
  }

  onItemSelected(user: IUser) {
    this.currentSelectedUser = user;
    this.mentionedUsersById.add(user.id);

    console.log(this.mentionedUsersById);
  }

  onClosed() {
    this.moveCaret();
  }

  ngAfterViewInit(): void {
  }

  onSubmit() {
    const text = this.field.nativeElement.innerText;

    console.log(text);
    console.log(this.mentionedUsersById);

    const result = text.match(this.pattern);
    console.log(result);

    result.map(u => {})


    this.clearField();
  }

  private moveCaret(): void {
    const el = this.field.nativeElement;
    // console.log(el.childNodes);
    // console.dir(el)

    const anchor = el.childNodes[el.childNodes.length - 1];

    // console.log(anchor);

    let range = document.createRange();
    let selection = window.getSelection();

    range.setStartAfter(anchor);
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);
  }

  private clearField(): void {
    this.field.nativeElement.innerText = '';
  }
}
