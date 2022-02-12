import { Component, OnInit } from '@angular/core';
import { AccountsService } from "./accounts.service";
import { CommentsService } from "./comments.service";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private accounts: AccountsService, private comments: CommentsService) { }
  unsortedList: any[] = [];
  users: any[] = [];
  tree: any[] = [];
  text: string = '';
  slectedObj: any = {};
  clockObs?: Observable<Date>;
  sub?: Date;
  currentUser: number = 3;

  ngOnInit() {
    // get initial data from the services
    this.unsortedList = this.comments.getJson();
    this.users = this.accounts.getJson();

    // clock
    this.clockObs = new Observable((observer) => {
      // observable execution
      setInterval(() => {
        observer.next(new Date());
      }, 1000)
    });
    this.clockObs.subscribe((date: any) => this.sub = date);
    this.updateView();
  }

  // callled on evry update, delte or add of new comment to update the comment tree
  updateView() {
    localStorage.setItem("obj", JSON.stringify(this.unsortedList));
    this.tree = this.list_to_tree(this.unsortedList);
  }

  // takes unsorted comments list and returns sorted commnets tree array
  list_to_tree(unsorted: any[]): any[] {
    // first sort by date
    unsorted.sort((a: any, b: any) => {
      return <any>new Date(b.createdAt) + <any>new Date(a.createdAt);
    });
    // then create the tree
    var map: any = {}, node: any, roots = [], i;

    for (i = 0; i < unsorted.length; i += 1) {
      map[unsorted[i].id] = i; // initialize the map
      unsorted[i].children = []; // initialize the children
    }

    for (i = 0; i < unsorted.length; i += 1) {
      node = unsorted[i];
      if (!node.deletedAt) {
        if (node.parentCommentId) {
          // if you have dangling branches check that map[node.parentId] exists
          unsorted[map[node.parentCommentId]].children.push(node);
        } else {
          roots.push(node);
        }
      }
    }
    return roots;
  }

  findUserById = (id: number) => {
    var index = this.users.findIndex((object: any) => {
      return object.id === id;
    });
    return this.users[index];
  }

  // add new comment or child comment
  submit(text: string, parent?: number) {
    this.unsortedList.push({
      "id": this.unsortedList.length + 1,
      "parentCommentId": parent ? parent : null,
      "ownerId": this.currentUser,
      "txt": text,
      "createdAt": new Date(),
      "deletedAt": null
    })
    this.updateView();
    this.text = "";
  }

  // edit or delete your comment or child comment
  updateOrDelete(id: number, text?: string) {
    var index = this.unsortedList.findIndex((object: any) => {
      return object.id === id;
    });
    if (text) {
      this.unsortedList[index].txt = text;
      this.unsortedList[index].createdAt = new Date
    };
    if (!text) this.unsortedList[index].deletedAt = new Date();
    this.text = "";
    this.updateView();
  }
}
