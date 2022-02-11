import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @Input() public obj: object = {};
  constructor() { }

  ngOnInit(): void {
    console.log(this.obj);
  }

}
