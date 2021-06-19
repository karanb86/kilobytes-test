import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {BehaviorSubject, Subject} from 'rxjs';
import {debounceTime, takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  formGroup: FormGroup;

  loading$ = new BehaviorSubject<boolean>(false);

  controls = {
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  };
  isAlive$ = new Subject();
  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.formGroup = new FormGroup(this.controls);
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      this.loading$.next(true);
      this.authService.login(this.formGroup.value).pipe(takeUntil(this.isAlive$), debounceTime(500))
        .subscribe(_ => {
        this.router.navigate(['dashboard']);
      }, _ => {
        this.loading$.next(false);
        alert('Login Failed');
      });
    } else {
      alert('Invalid credentials');
    }
  }

  ngOnDestroy(): void {
    this.isAlive$.next(false);
    this.isAlive$.complete();
  }
}
