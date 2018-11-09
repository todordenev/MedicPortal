import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UserService } from '@app/core/user.service';
import { User } from '@app/shared/user';

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
    userImgSrc ="api/accounts/avatarimage"; 
    registrationForm: FormGroup;
    constructor(private userService: UserService,
        private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.createFormGroup(this.userService.user);
    }
    imgChanged(imgSrc) {
        this.registrationForm.patchValue({
            avatarImageSrc: imgSrc
        })
    }

    createFormGroup(user: User) {
        this.registrationForm = this.formBuilder.group({
            firstName: [user ? user.givenName : 'Todor', [Validators.required]],
            lastName: [user ? user.familyName : 'Denev', [Validators.required]],
            email: [user ? user.email : 'todor_denev@yahoo.com', [Validators.required]],
            password: ['123456', [Validators.required]],
            password2: ['123456', [Validators.required]],
            telefon: [user ? user.Phone : '01234', [Validators.required]],
            avatarImageSrc: [""]
        });
    }
    onSubmit({ value }) {
        this.userService.register(value).subscribe((status) => {
            alert(status);
        });
    }
}