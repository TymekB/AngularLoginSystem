import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../models/user';
import {UniqueUsernameValidator} from '../validator/uniqueUsername.validator';
import {UserRepositoryService} from '../services/user-repository.service';
import {UniqueEmailValidator} from '../validator/uniqueEmail.validator';
import {UserUpdaterService} from '../services/user-updater.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    registerForm: FormGroup;

    constructor(private userRepository: UserRepositoryService, private updater: UserUpdaterService) {

        this.registerForm = new FormGroup({
            username: new FormControl(null,
                [
                    Validators.required,
                    Validators.minLength(4),
                    Validators.maxLength(20),
                    Validators.pattern(/^[a-z0-9]+$/i)
                ], [UniqueUsernameValidator.createValidator(this.userRepository)]),
            email: new FormControl(null,
                [
                    Validators.required,
                    Validators.email
                ], [UniqueEmailValidator.createValidator(this.userRepository)]),
            password: new FormControl(null,
                [
                    Validators.required,
                    Validators.minLength(8),
                    Validators.maxLength(30),
                ]),
            repeatPassword: new FormControl(null, [Validators.required])
        });

    }

    ngOnInit() {

    }

    onSubmit() {

        const user = new User(this.username.value, this.password.value, this.email.value);
        this.updater.create(user);
    }

    get username() {
        return this.registerForm.get('username');
    }

    get email() {
        return this.registerForm.get('email');
    }

    get password() {
        return this.registerForm.get('password');
    }

    get repeatPassword() {
        return this.registerForm.get('repeatPassword');
    }
}
