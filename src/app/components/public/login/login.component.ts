import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { PopupLoginComponent } from '../../popup-login/popup-login.component';
import { UserService } from '../../../services/user.service';
import { ServiceResponse } from '../../../models/ServiceResponse';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  private error: any = undefined;

  constructor(private userService: UserService) { }

  loginClick(formData: any) {
    const loginResult = this.userService.login(formData.usernameOrEmail, formData.password);
    loginResult.subscribe((result: ServiceResponse) => {
      if (result.success) {
        this.userService.afterLoginSuccess(result);
      } else {
        this.error = result;
      }
    }, (errObj: any) => {
      this.error = errObj.error;
    });
  }

  onTextChange() {
    this.error = false;
  }
}
