import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '@app/core/user.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    isLoggedIn: boolean;
    userName: string;
    constructor(private userService: UserService,
        private formBuilder: FormBuilder,
        private router: Router) { }
    ngOnInit() {
        this.createFormGroup();
        this.userService.isLoggedIn.subscribe(value => this.isLoggedIn = value);
        this.userName = this.userService.getUserName;
    }
    createFormGroup() {
        this.loginForm = this.formBuilder.group({
            userName: ['todor_denev@yahoo.com', [Validators.required]],
            password: ['123456', [Validators.required]]
        });
    }
    onSubmit({ value, valid }) {
        this.userService.login(value).subscribe((status) => {
        //    this.router.navigate(['/doctors']);
        });
    }
    logout() {
        this.userService.logout().subscribe((status) => {
        });
    }
}
