import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AlertComponent } from 'src/app/shared/alert/alert/alert.component';
import { PlaceholderDirective } from 'src/app/shared/placeholder.directive';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {

  isLoginMode = true;
  isLoading = false;
  error : string = null;
  private subscription : Subscription
  @ViewChild(PlaceholderDirective, {static: false}) alertHost : PlaceholderDirective

  constructor(private authService: AuthService, private router : Router) { }


  ngOnInit(): void {
  }

  onSwitchMode(): void {
    this.isLoginMode = !this.isLoginMode
  }

  onSubmit(form : NgForm) {
    if(!form.valid){    // Hacking purpose
      return;
    }

    this.isLoading = true;

    const email = form.value.email;
    const password = form.value.password;

    let authObservable : Observable<AuthResponseData>

    if(this.isLoginMode){
      authObservable = this.authService.login(email, password)
    } else {
      authObservable = this.authService.signup(email, password)
    }

    authObservable.subscribe(response => {
      console.log(response);
      this.isLoading = false;
      this.router.navigate(['/recipes']);
    }, errorMsg => {
      this.error = errorMsg;
      this.showError(errorMsg);
      this.isLoading = false;
    });

    form.reset();
  }

  onErrorToastClosing(){
    this.error = null;
  }

  private showError(message){
   const hostViewContainerRef = this.alertHost.viewContainerRef;
   hostViewContainerRef.clear();
   const componentRef = hostViewContainerRef.createComponent(AlertComponent);
   componentRef.instance.message = message;
   this.subscription =  componentRef.instance.close.subscribe(() => {
    hostViewContainerRef.clear();
    this.subscription.unsubscribe();
   });
  }

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }
}
