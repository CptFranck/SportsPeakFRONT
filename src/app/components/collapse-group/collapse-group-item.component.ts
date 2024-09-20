import {Component, Input, OnInit} from '@angular/core';
import {NgForOf} from "@angular/common";
import {CollapseGroupItem} from "../../interface/components/collapse-group/collapse-group";

@Component({
  selector: 'app-collapse-group-item',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './collapse-group-item.component.html',
})
export class CollapseGroupItemComponent implements OnInit {
  accordionItem!: CollapseGroupItem;

  show: string = "";
  collapsed: string = "";
  parentId!: string;

  @Input() title: string | null = "";
  @Input() itemId!: string;
  @Input() isOpen: boolean = false;
  @Input() stayOpen: boolean = false;

  @Input() set accordionParentId(accordionParentId: string) {
    this.parentId = "#" + accordionParentId;
  }

  ngOnInit() {
    this.accordionItem = {
      id: this.accordionParentId + this.itemId,
      title: this.title,
      open: this.isOpen
    }
    if (this.accordionItem.open) {
      this.show = "show"
    } else {
      this.collapsed = "collapsed"
    }
    if (this.stayOpen) {
      this.parentId = ""
    }
  }
}
