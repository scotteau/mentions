import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {IUser, UserService} from '../user.service';

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

  patternName = /[@][\w]{2,}\s[\w]{2,}/;
  patternWrapped = /<.+>[@][\w]{2,}\s[\w]{2,}<\/.+?>/;

  @ViewChild('textarea') field: ElementRef;

  constructor(private readonly userService: UserService) {
  }

  ngOnInit(): void {
    this.allUsers = this.userService.getUsers();
    this.allUsersDictionary = this.arrayToDictionary(this.allUsers);
  }

  ngAfterViewInit(): void {

  }

  onItemSelected(user: IUser): void {
    this.currentSelectedUser = user;
    this.mentionedUsersById.add(user.id);

    // console.log(this.mentionedUsersById);
  }

  onClosed(): void {
    this.moveCaret();
  }


  onSubmit(): void {
    const text = this.field.nativeElement.innerText;

    if (text && text.trim()) {
      const result = text.match(new RegExp(this.patternName, 'g'));
      const mentionedNames = result.map(u => u.split('@')[1]);
      const everMentionedUsers = [...this.mentionedUsersById].map((id) => this.allUsersDictionary[id]);
      const mentionedUsers = everMentionedUsers.filter((user) => mentionedNames.indexOf(user.displayName) >= 0);
      // console.log(mentionedUsers);
    }
    this.clearField();
  }

  private moveCaret(): void {
    const el = this.field.nativeElement;
    // console.log(el.childNodes);
    // console.dir(el)

    const anchor = el.childNodes[el.childNodes.length - 1];

    // console.log(anchor);

    const range = document.createRange();
    const selection = window.getSelection();

    range.setStartAfter(anchor);
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);
  }

  private clearField(): void {
    this.field.nativeElement.innerText = '';
  }

  private arrayToDictionary(users: IUser[]): { [id: string]: IUser } {
    const dictionary: { [id: string]: IUser } = {};
    users.forEach((user) => {
      dictionary[user.id] = user;
    });
    return dictionary;
  }

  onContentChange(e: any): void {
    let innerHTML: string = e.target.innerHTML;


  }



  private findMentionedUsersData(names: string[]): IUser[] {
    return [...this.mentionedUsersById]
      .map((id) => this.allUsersDictionary[id])
      .filter((user) => names.indexOf(user.displayName) >= 0);
  }

  private nameRegex(name: string, wrapped: boolean = false): RegExp {
    return wrapped ? new RegExp(`^(<.+>${name}(<\/.+>)$)`) : new RegExp(`${name}`);
  }

  private wrapNameInTag(content: string): string {
    return `<strong>${content}</strong>&nbsp;`;
  }
}

