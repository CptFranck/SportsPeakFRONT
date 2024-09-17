import {Component, Input, OnInit} from '@angular/core';
import {NgForOf} from "@angular/common";
import {tabOption} from "../../interface/components/tab/tabOption";

@Component({
  selector: 'app-tab-header',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './tab-header.component.html',
  styleUrl: './tab-header.component.css',
})
export class TabHeaderComponent implements OnInit {
  ulClass!: string
  dataBsToggle!: string

  @Input() tabId!: string;
  @Input() type: string = "tab";
  @Input() tabOptions!: tabOption[];

  ngOnInit() {
    if (this.type === "tab") {
      this.ulClass = "nav-tabs"
      this.dataBsToggle = "tab";
    } else if (this.type === "pill") {
      this.ulClass = "nav-pills"
      this.dataBsToggle = "pill";
    }
  }
}
