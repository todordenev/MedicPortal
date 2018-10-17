import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
    registrationForm: FormGroup;
    constructor(private authService: UserService,
        private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.createFormGroup();
    }

    createFormGroup() {
        this.registrationForm = this.formBuilder.group({
            firstName: ['Todor', [Validators.required]],
            lastName: ['Denev', [Validators.required]],
            email: ['todor_denev@yahoo.com', [Validators.required]],
            password: ['123456', [Validators.required]],
            password2: ['123456', [Validators.required]],
            telefon: ['01234', [Validators.required]]
        });
    }
    onSubmit({ value }) {
        this.authService.register(value).subscribe((status) => {
            alert(status);
        })
    }
}
