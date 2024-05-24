import * as $ from 'jquery';
import "select2";

import {AfterViewInit, Component} from '@angular/core';

@Component({
  selector: 'app-multi-select',
  standalone: true,
  imports: [],
  templateUrl: './multi-select.component.html',
})
export class MultiSelectComponent implements AfterViewInit {
  selectedValues: Array<any> = [];
  searchFiled: string = "";

  ngAfterViewInit() {
    $('#basic-usage').select2({
      theme: "bootstrap-5",
      width: $(this).data('width') ? $(this).data('width') : $(this).hasClass('w-100') ? '100%' : 'style',
      placeholder: $(this).data('placeholder'),
    });
  }
}
