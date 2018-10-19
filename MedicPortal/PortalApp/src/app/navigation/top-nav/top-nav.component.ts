import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { UserService } from '../../user/user.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-top-nav',
    templateUrl: './top-nav.component.html',
    styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent implements OnInit {
    isLoggedIn$: Observable<boolean>;
    @Input()
    showAllElements: boolean;

    @Output()
    toggleSideBarClicked = new EventEmitter<boolean>();

    constructor(private userService: UserService) { }

    ngOnInit() {
        this.isLoggedIn$ = this.userService.isLoggedIn;
    }
    get hideDesktopElements() {
        return !this.showAllElements;
    }
}
