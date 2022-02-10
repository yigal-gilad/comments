import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  constructor() { }

  getJson() {
    return [
      {
        "id": 1,
        "displayName": "Apu Nahasapeemapetilon"
      },
      {
        "id": 2,
        "displayName": "Homer J. Simpson"
      },
      {
        "id": 3,
        "displayName": "Bart Simpson"
      },
      {
        "id": 4,
        "displayName": "Mr. Burns"
      },
      {
        "id": 5,
        "displayName": "Milhouse Van Houten"
      },
      {
        "id": 6,
        "displayName": "Krusty the Clown"
      }
    ]
  }
}
