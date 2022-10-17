import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { User } from "../../models/user";



@Component({
  selector: 'dialog-data',
  templateUrl: './dialog-data.component.html',
  styleUrls: ['./dialog-data.component.scss'],
})
export class DialogDataComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { contributors: User[] }) {}
}
