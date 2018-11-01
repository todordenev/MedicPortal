import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from './core/user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLoggedIn: boolean;
  userName: string;
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  constructor(private userService: UserService,
    changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.userService.isLoggedIn.subscribe(value => this.userLoggedInChanged(value));
  }
  userLoggedInChanged(loggedIn: boolean): void {
    this.isLoggedIn = loggedIn;
    this.userName = this.userService.getUserName;
  }


}
