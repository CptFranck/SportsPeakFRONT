import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NavBarComponent} from './components/nav-bar/nav-bar.component';
import {AlertDisplayComponent} from "./components/alert-display/alert-display.component";

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
