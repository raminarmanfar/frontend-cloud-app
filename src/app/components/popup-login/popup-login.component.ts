import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogData } from '../../models/DialogData';
import { UserService } from '../../services/user.service';
import { ServiceResponse } from '../../models/ServiceResponse';

@Component({
  selector: 'app-popup-login',
  templateUrl: './popup-login.component.html',
  styleUrls: ['./popup-login.component.scss']
})
export class PopupLoginComponent {
  private error: any = undefined;

  constructor(
    private userService: UserService,
    private router: Router,
    private dialogRef: MatDialogRef<PopupLoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  loginClick(frm: any) {
      const loginResult = this.userService.login(frm.usernameOrEmail, frm.password);
      loginResult.subscribe((result: ServiceResponse) => {
        if (result.success) {
          this.userService.afterLoginSuccess(result);
          this.dialogRef.close(result);
        } else {
          this.error = result;
        }
      }, (errObj: any) => {
        this.error = errObj.error;
      });
  }

  onCancelClick () {
    this.dialogRef.close(null);
  }

  onLinkClick(linkUrl: string) {
    this.dialogRef.close();
    this.router.navigate(['/public/' + linkUrl]);
  }

  onTextChange() {
    this.error = false;
  }
}
