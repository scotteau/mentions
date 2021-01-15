import {AfterViewInit, Component, ElementRef, OnInit, Output, ViewChild} from '@angular/core';
import {IUser, UserService} from '../user.service';
import {EventEmitter} from '@angular/core';

@Component({
  selector: 'app-editor-field',
  templateUrl: './editor-field.component.html',
  styleUrls: ['./editor-field.component.scss']
})
export class EditorFieldComponent implements OnInit, AfterViewInit {

  private allUsersDictionary: { [id: string]: IUser };
  allUsers: IUser[] = [];
  currentSelectedUser: IUser;
  mentionedUsersById = new Set<string>();
  pattern = /[@#][\w'\-,.]{2,}[^0-9_!¡?÷?¿\\+=@#$%ˆ&*(){}|~<>;:[\]][\w'\-,.]{2,}/g;

  @ViewChild('textarea') field: ElementRef;

  constructor(private readonly userService: UserService) {
  }

  ngOnInit(): void {
    this.allUsers = this.userService.getUsers();
    this.allUsersDictionary = this.arrayToDictionary(this.allUsers);
    console.log(this.allUsers);
  }

  ngAfterViewInit(): void {

  }

  onItemSelected(user: IUser) {
    this.currentSelectedUser = user;
    this.mentionedUsersById.add(user.id);

    console.log(this.mentionedUsersById);
  }

  onClosed() {
    this.moveCaret();
  }


  onSubmit() {
    const text = this.field.nativeElement.innerText;

    if (text && text.trim()) {
      const result = text.match(this.pattern);
      const mentionedNames = result.map(u => u.split('@')[1]);
      const everMentionedUsers = [...this.mentionedUsersById].map((id) => this.allUsersDictionary[id]);
      const mentionedUsers = everMentionedUsers.filter((user) => mentionedNames.indexOf(user.displayName) >= 0);
      console.log(mentionedUsers);
    }
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

  private arrayToDictionary(users: IUser[]): { [id: string]: IUser } {
    let dictionary: { [id: string]: IUser } = {};
    users.forEach((user) => {
      dictionary[user.id] = user;
    });
    return dictionary;
  }

  onContentChange(e: any) {
    const text = e.target.innerText;



    console.log(text);
  }
}
