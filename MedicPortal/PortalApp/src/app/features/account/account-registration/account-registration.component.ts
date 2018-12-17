import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UserService } from '@app/core/services';
import { User } from '@app/core/entities/user';

@Component({
    selector: 'app-registration',
    templateUrl: './account-registration.component.html',
    styleUrls: ['./account-registration.component.css']
})
export class AccountRegistrationComponent implements OnInit {
    userImgSrc = 'api/accounts/avatarimage';
    registrationForm: FormGroup;
    isLoggedIn: boolean;
    constructor(
        private userService: UserService,
        private formBuilder: FormBuilder) {
    }
    ngOnInit() {
        this.userService.user.subscribe(user => this.createFormGroup(user));
        this.userService.isLoggedIn.subscribe(isLoggedIn => this.isLoggedIn = isLoggedIn);
    }
    imgChanged(imgSrc) {
        this.registrationForm.patchValue({
            avatarImageSrc: imgSrc
        });
    }
    createFormGroup(user: User) {
        this.registrationForm = this.formBuilder.group({
            firstName: [user ? user.firstName : 'Todor', [Validators.required]],
            lastName: [user ? user.lastName : 'Denev', [Validators.required]],
            email: [user ? user.email : 'todor_denev@yahoo.com', [Validators.required]],
            password: ['123456', [Validators.required]],
            password2: ['123456', [Validators.required]],
            telefon: [user ? user.phoneNumber : '01234', [Validators.required]],
            avatarImageSrc: ['']
        });
        this.userImgSrc = user.avatarImage;
    }
    onSubmit({ value }) {
        if (this.isLoggedIn) {
            this.userService.register(value).subscribe((status) => {
                alert(status);
            });
        } else {
            this.userService.register(value).subscribe((status) => {
                alert(status);
            });
        }
    }
}
