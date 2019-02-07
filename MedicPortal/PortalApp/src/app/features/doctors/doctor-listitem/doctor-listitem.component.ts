import { Component, OnInit, Input } from '@angular/core';
import { Doctor } from '@app/core/entities';
import { UserService, RegistrationCodesService } from '@app/core';
import { User } from '@app/core/entities/user';

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
    constructor(private userService: UserService, private registrationCodesService: RegistrationCodesService) { }

    ngOnInit(): void {
        this.userService.user.subscribe(user => this.user = user);
        this.userService.isLoggedIn.subscribe(value => this.isLoggedIn = value);
    }

    test() {
        alert(this.doctor.workdays);
    }
    get imageUrl() {
        return './assets/doctor_' + this.doctor.id + '.jpg';
    }
    isUserAuthorised() {
        return this.isLoggedIn && this.userService.hasClaim('make-appointments', this.doctor.id);
    }
    showCodeInput() {
        this.codeInputIsVisible = true;
    }
    applyRegistrationCode() {
        this.registrationCodesService.applyRegistrationCode(this.doctor.id, this.registrationCode).subscribe(() => this.refreshUserClaims())

    }
    private refreshUserClaims() {
        this.userService.getUserInfo();
    }
}
