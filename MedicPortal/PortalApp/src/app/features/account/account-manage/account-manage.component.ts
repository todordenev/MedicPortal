import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UserService } from '@app/core/services';
import { User } from '@app/core/entities/user';
import { Router } from '@angular/router';
import { createPatch } from 'rfc6902';

@Component({
    selector: 'app-account-manage',
    templateUrl: './account-manage.component.html',
    styleUrls: ['./account-manage.component.css']
})
export class AccountManageComponent implements OnInit {
    userImgSrc = '';
    registrationForm: FormGroup;
    isLoggedIn: boolean;
    user: User;
    constructor(
        private userService: UserService,
        private formBuilder: FormBuilder,
        private router: Router) {
    }
    ngOnInit() {
        this.userService.user.subscribe(user => this.createFormGroup(user));
        this.userService.isLoggedIn.subscribe(isLoggedIn => this.isLoggedIn = isLoggedIn);
        this.userService.getAvatarImage().subscribe(imageSrc => this.setImageSrc(imageSrc));
    }
    private setImageSrc(value) {
        this.registrationForm.patchValue({
            avatarImage: value
        });
        this.userImgSrc = value;
    }
    imgChanged(imgSrc) {
        this.registrationForm.patchValue({
            avatarImage: imgSrc
        });
    }
    createFormGroup(user: User) {
        this.registrationForm = this.formBuilder.group({
            firstName: [user.firstName, [Validators.required]],
            lastName: [user.lastName, [Validators.required]],
            email: [user.email, [Validators.required]],
            phoneNumber: [user.phoneNumber],
            avatarImage: ['']
        });

        this.user = { ...user };
        // Roles ans Claims schould not be changed.
        delete this.user.roles;
        delete this.user.claims;
    }
    onSubmit() {
        const changedUser = this.registrationForm.value;
        changedUser.roles = this.user.roles;

        const changes = createPatch(this.user, changedUser);

        // this.userService.register(value).subscribe((status) => {
        //     this.router.navigate(['/account/patients']);
        // });
    }
}
