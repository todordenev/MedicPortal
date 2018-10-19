import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from './user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLoggedIn: boolean;

  ngOnInit(): void {
    this.userService.isLoggedIn.subscribe(value => this.isLoggedIn = value);
  }

  constructor(private userService: UserService) {
  }
}
