import {HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest} from '@angular/common/http';
import {Injectable} from "@angular/core";
import {AuthService} from "../services/auth.service";
import {catchError, Observable, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AppHttpInterceptor implements HttpInterceptor{

  constructor(private authService : AuthService) {
  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(!request.url.includes("/auth/login")){
      let newRequest = request.clone({
        headers : request.headers.set('Authorization','Bearer '+this.authService.accessToken)
      })
      return next.handle(newRequest).pipe(
        catchError(err => {
          if (err.status==401)
            this.authService.logout();
          return  throwError(err.message())
        })
      );
    }else return next.handle(request);
  }

}
