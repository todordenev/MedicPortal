import { Component, OnInit, Input } from '@angular/core';
import { Doctor } from '@app/core/entities';
import { UserService, RegistrationCodesService } from '@app/core';
import { User } from '@app/core/entities/user';
import { HttpErrorResponse } from '@angular/common/http';
import { ClaimsService } from '@app/core/services/claims.service';

@Component({
    selector: 'app-doctor-listitem',
    templateUrl: './doctor-listitem.component.html',
    styleUrls: ['./doctor-listitem.component.css']
})
export class DoctorListitemComponent implements OnInit {
    @Input()
    doctor: Doctor;
    user: User;
    isLoggedIn: boolean;
    codeInputIsVisible: boolean;
    registrationCode: string;
    isUserAuthorised: boolean;
    hasCodeError: boolean;
    constructor(private userService: UserService,
        private registrationCodesService: RegistrationCodesService,
        private claimsService: ClaimsService) { }

    ngOnInit(): void {
        this.userService.user.subscribe(user => this.onUserChanged(user));
        this.userService.isLoggedIn.subscribe(isLoggedin => this.onLoginChanged(isLoggedin));
    }

    onUserChanged(user) {
        this.user = user;
        this.isUserAuthorised = this.isLoggedIn && this.claimsService.hasClaim('make-appointments', this.doctor.id);
        if (this.isUserAuthorised) {
            this.codeInputIsVisible = false;
        }
    }
    onLoginChanged(isLoggedin) {
        this.isLoggedIn = isLoggedin;
        this.isUserAuthorised = this.isLoggedIn && this.claimsService.hasClaim('make-appointments', this.doctor.id);
        if (this.isUserAuthorised) {
            this.codeInputIsVisible = false;
        }
    }
    showCodeInput() {
        this.codeInputIsVisible = true;
    }
    applyRegistrationCode() {
        this.registrationCodesService
            .applyRegistrationCode(this.doctor.id, this.registrationCode)
            .subscribe(() => this.refreshUserClaims(), (error) => this.onError(error));

    }
    onError(error: HttpErrorResponse): void {
        if (error.statusText === 'OK' && error.status === 400) { // BadRequest
            this.hasCodeError = true;
        }
    }
    private refreshUserClaims() {
        this.userService.getUserInfo();
    }
}
