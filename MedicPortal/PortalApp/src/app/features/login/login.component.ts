import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '@app/core/services';

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
        private route: ActivatedRoute,
        private router: Router) { }
    ngOnInit() {
        this.createFormGroup();
        this.userService.isLoggedIn.subscribe(value => this.isLoggedIn = value);
        this.userService.user.subscribe(user => this.userName = user.displayName);
    }
    createFormGroup() {
        this.loginForm = this.formBuilder.group({
            userName: ['todor_denev@yahoo.com', [Validators.required]],
            password: ['123456', [Validators.required]]
        });
    }
    onSubmit({ value, valid }) {
        this.userService.login(value).subscribe((status) => {
            let source = this.route.snapshot.paramMap.get('source');
            if (!source) {
                source = '/';
            }
            this.router.navigate([source]);
        });
    }
    logout() {
        this.userService.logout().subscribe((status) => {
        });
    }
}
