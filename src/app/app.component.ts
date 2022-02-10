import { Component, OnInit } from '@angular/core';

import { AccountsService } from "./accounts.service";
import { CommentsService } from "./comments.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private accounts: AccountsService, private comments: CommentsService) { }
  oldLIst: any;
  list: any;
  users: any;
  text: any;

  ngOnInit() {
    this.oldLIst = this.comments.getJson();
    this.updateView();
  }
  title = 'comments';

  updateView() {
    this.list = this.oldLIst;
    localStorage.setItem("obj", JSON.stringify(this.oldLIst));
    this.list.sort((a: any, b: any) => {
      return <any>new Date(b.createdAt) - <any>new Date(a.createdAt);
    });
    this.list = this.list_to_tree(this.list);

    this.users = this.accounts.getJson();
  }

  list_to_tree(list: any) {
    var map: any = {}, node: any, roots = [], i;

    for (i = 0; i < list.length; i += 1) {
      map[list[i].id] = i; // initialize the map
      list[i].children = []; // initialize the children
    }

    for (i = 0; i < list.length; i += 1) {
      node = list[i];
      if (node.parentCommentId && !node.deletedAt) {
        // if you have dangling branches check that map[node.parentId] exists
        list[map[node.parentCommentId]].children.push(node);
      } else {
        roots.push(node);
      }
    }
    return roots;
  }

  custom_sort([a, b]: any) {
    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
  }

  sortTree(tree: any) {
    tree.children.sort(function ([a, b]: any) {

      return new Date(b.createdAt)
    });
    for (let i = 0; i < tree.children.length; i++) {
      this.sortTree(tree.children[i])
    }
  }

  findUserById = (id: string) => {
    let [key, user]: any = Object.entries(this.users).find(([key, user]: any) => user.id === id);
    return user;
  }

  submit(text: string, parent?: number) {

    this.oldLIst.push({
      "id": this.oldLIst.length,
      "parentCommentId": parent ? parent : null,
      "ownerId": 3,
      "txt": text,
      "createdAt": new Date(),
      "deletedAt": null
    })
    console.log(this.oldLIst[this.oldLIst.length])
    this.updateView();
    this.text = "";
  }

  updateOrDelete(id: number, text?: string, obj?: any) {
    var index = this.oldLIst.findIndex((object: any) => {
      return object.id === id;
    });
    if (text) this.oldLIst[index].txt = text;
    if (!text) this.oldLIst[index].deletedAt = new Date();
    this.text = "";
    this.updateView();
  }

}
