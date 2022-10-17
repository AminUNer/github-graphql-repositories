import { Component, Input } from '@angular/core';
import { Repository } from "../../models/repository";
import { MatDialog } from "@angular/material/dialog";
import { DialogDataComponent } from "../dialog-data/dialog-data.component";

@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.scss']
})
export class RepositoryComponent {
  @Input() repository: Repository = {};

  constructor(public dialog: MatDialog) { }

  openDialog() {
    this.dialog.open(DialogDataComponent, { data: {
      contributors: this.repository.contributors,
      }});
  }

}
