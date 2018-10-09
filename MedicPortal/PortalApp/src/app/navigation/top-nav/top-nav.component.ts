import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../user/auth.service';

@Component({
    selector: 'app-top-nav',
    templateUrl: './top-nav.component.html',
    styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent implements OnInit {
    isAuthenticated:boolean;
    authenticatedUser:string;
    @Input()
    showAllElements: boolean;

    get hideDesktopElements() {
        return !this.showAllElements;
    }

    @Output()
    toggleSideBarClicked = new EventEmitter<boolean>();

    constructor(private authService: AuthService) { }

    ngOnInit() {
        this.authService.authChanged
            .subscribe(() => {
                this.isAuthenticated = this.authService.isAuthenticated;
                this.authenticatedUser = this.authService.user;
            });
        let user = this.authService.user;
    }
}
