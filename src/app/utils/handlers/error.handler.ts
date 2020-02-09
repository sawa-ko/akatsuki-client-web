import { Injectable, ErrorHandler, NgZone, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { TranslationService } from '../../services/translation/translatation.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorHandlerGlobal extends ErrorHandler {
  constructor(private zone: NgZone, private readonly injector: Injector) {
    super();
  }

  handleError(error: Error | HttpErrorResponse): void {
    const router = this.injector.get(Router);
    const toastrService = this.injector.get(ToastrService);
    if (error instanceof HttpErrorResponse) {
      if (!navigator.onLine) {
        this.zone.run(() => {
          toastrService.error(
            'We could not contact our servers.',
            'We are disconnected!',
            {
              progressBar: true,
              enableHtml: true,
              timeOut: 10000,
            },
          );
        });
      } else {
        toastrService.error(error.error.message, 'We have problems', {
          progressBar: true,
          enableHtml: true,
          timeOut: 10000,
        });
      }
    } else {
      this.zone.run(() => {
        router.navigate(['app-error']);
      });
    }
    super.handleError(error);
  }
}
