import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    constructor(private authService: UserService,
        private formBuilder: FormBuilder,
        private router: Router) { }

    ngOnInit() {
        this.createFormGroup();
    }
    createFormGroup() {
        this.loginForm = this.formBuilder.group({
            userName: ['todor_denev@yahoo.com', [Validators.required]],
            password: ['123456', [Validators.required]]
        });
    }
    onSubmit({ value, valid }) {
        this.authService.login(value).subscribe((status) => {
            this.router.navigate(['/doctors']);
        });
    }
}
