import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UserService } from '@app/core/services';
import { User } from '@app/core/entities/user';
import { Router } from '@angular/router';
import { ConfirmPasswordValidator } from './confirm-password.validator';

@Component({
    selector: 'app-registration',
    templateUrl: './account-registration.component.html',
    styleUrls: ['./account-registration.component.css']
})
export class AccountRegistrationComponent implements OnInit {
    registrationForm: FormGroup;
    constructor(
        private userService: UserService,
        private formBuilder: FormBuilder,
        private router: Router) {
    }
    ngOnInit() {
        this.registrationForm = this.formBuilder.group({
            firstName: ['', [Validators.required]],
            lastName: ['', [Validators.required]],
            email: ['', [Validators.required]],
            password: ['', [Validators.required]],
            confirmPassword: ['', [Validators.required]],
            phoneNumber: ['']
        }, {
                validator: ConfirmPasswordValidator.MatchPassword
            });
    }
    onSubmit({ value }) {
        this.userService.register(value).subscribe((status) => {
            this.router.navigate(['/account/patients']);
        });
    }
}
