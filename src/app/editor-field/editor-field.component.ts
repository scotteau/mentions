import {AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
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

  htmlContent: string;

  @ViewChild('textarea') field: ElementRef;

  //region - hidden
  constructor(private readonly userService: UserService, private readonly renderer: Renderer2) {
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

    console.log('selected');

    // console.log(this.mentionedUsersById);
  }

  onClosed(): void {

    console.log('closed');
    this.moveCaret();
    this.currentSelectedUser = null;
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

// endregion

  onInput(e: any): void {
    console.log(e);

    let innerHTML: string = e.target.innerHTML;

    const names = this.getMentionedNames(innerHTML);
    this.htmlContent = this.putNamesWithTaggedNames(innerHTML, names);

    e.target.innerHTML = this.htmlContent;


    this.moveCaret();
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

  private getMentionedNames(content: string): string[] {
    const mentions = content.match(new RegExp(this.patternName, 'g'));
    const listOfUniqueNames = new Set<string>();
    if (mentions) {
      mentions.forEach((m) => listOfUniqueNames.add(m));
    }
    return [...listOfUniqueNames];
  }

  private putNamesWithTaggedNames(content: string, names: string[]): string {
    names.forEach((name) => {
      content = content.split(name).join(this.wrapNameInTag(name));
    });
    return content;
  }
}

