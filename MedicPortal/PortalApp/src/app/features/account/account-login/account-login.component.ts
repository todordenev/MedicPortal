import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '@app/core/services';
import { User } from '@app/core/entities/user';

@Component({
    selector: 'app-login',
    templateUrl: './account-login.component.html',
    styleUrls: ['./account-login.component.css']
})
export class AccountLoginComponent implements OnInit {
    loginForm: FormGroup;
    isLoggedIn: boolean;
    userName: string;
    logins: string[] = [
        'todor_denev@yahoo.com',
        'nelina_p@yahoo.de',
        'irina.ivanova@gmail.com',
        'nujka.peeva@gmail.com',
        'ivan.ivanov@gmail.com',
        'todor_admin@gmail.com'];
    currentLogin = 0;
    constructor(private userService: UserService,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router) { }
    ngOnInit() {
        this.createFormGroup();
        this.userService.isLoggedIn.subscribe(value => this.isLoggedIn = value);
        this.userService.user.subscribe(user => this.userName = user.email);
    }
    createFormGroup() {
        this.loginForm = this.formBuilder.group({
            userName: ['', [Validators.required]],
            password: ['123456', [Validators.required]]
        });
        this.loginForm.patchValue({
            userName: this.logins[this.currentLogin % 6]
        });
    }
    onDownClick() {
        this.currentLogin++;
        this.loginForm.patchValue({
            userName: this.logins[this.currentLogin % 6]
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
}
