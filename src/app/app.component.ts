import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {AlertDisplayComponent} from "./shared/components/alert-display/alert-display/alert-display.component";
import {NavBarComponent} from "./shared/components/nav-bar/nav-bar.component";

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    NavBarComponent,
    AlertDisplayComponent
  ],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'SportsPeak';
}
