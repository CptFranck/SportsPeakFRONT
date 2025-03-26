import {Component, OnInit} from '@angular/core';
import {LoginFormComponent} from "../../../components/form/auth/login-form/login-form.component";
import {RegisterFormComponent} from "../../../components/form/auth/register-form/register-form.component";
import {TabHeaderComponent} from "../../../components/tab-header/tab-header.component";
import {TabOption} from "../../../interface/components/tab/tabOption";

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
