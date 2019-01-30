import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '@app/core/services';
import { User } from './core/entities/user';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    display = true;
    isLoggedIn: boolean;
    userName: string;
    user: User;
    mobileQuery: MediaQueryList;
    private _mobileQueryListener: () => void;
    constructor(private userService: UserService,
        changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
        this.mobileQuery = media.matchMedia('(max-width: 600px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);
    }
    ngOnInit(): void {
        this.userService.isLoggedIn.subscribe(value => this.isLoggedIn = value);
        this.userService.user.subscribe(user => this.setUser(user));
    }
    setUser(user: User) {
        this.user = user;
        this.userName = user.firstName + ' ' + user.lastName;
    }
    userInRole(roles: string[]) {
        if (this.user) {
            let roleFound = false;
            roles.forEach(expectedRole => {
                const indexOfExpectedRole = this.user.roles.indexOf(expectedRole);
                if (indexOfExpectedRole > -1) {
                    roleFound = true;
                }
            });
            return roleFound;
        } else {
            return false;
        }
    }
    logout() {
        this.userService.logout().subscribe((status) => { });
    }
}
