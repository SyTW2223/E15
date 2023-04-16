import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';


@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {


  constructor(private authService: AuthenticationService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const tokenizedReq = req.clone({
      setHeaders: {
        Authorization: 'Bearer ' + this.authService.getToken()
      }
    })
    return next.handle(tokenizedReq)
  }
}
