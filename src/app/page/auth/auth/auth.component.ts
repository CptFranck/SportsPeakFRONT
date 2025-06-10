import {Component, OnInit} from '@angular/core';
import {LoginFormComponent} from "../../../shared/components/forms/auth/login-form/login-form.component";
import {RegisterFormComponent} from "../../../shared/components/forms/auth/register-form/register-form.component";
import {TabHeaderComponent} from "../../../shared/components/tab-header/tab-header.component";
import {TabOption} from "../../../shared/model/component/tab/tabOption";

@Component({
  selector: 'app-login',
  imports: [
    LoginFormComponent,
    RegisterFormComponent,
    TabHeaderComponent
  ],
  styleUrl: "auth.component.css",
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit {
  tabId: string = "targetLogsTab";
  tabOptions: TabOption[] = [];

  ngOnInit() {
    this.tabOptions = [
      {id: "loginTabId", title: "Login", active: "active"},
      {id: "registerTabId", title: "Register", active: ""},
    ]
  }
}
