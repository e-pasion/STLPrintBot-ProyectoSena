import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler } from "@angular/common/http";
import { AuthServiceService } from "../auth/auth-service.service";
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthServiceService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const authToken = this.authService.getToken();
        if (authToken) {
            // Clona la solicitud y agrega el encabezado de autorización
            req = req.clone({
              setHeaders: {
                "x-access-token": authToken
              }
            });
        }
        return next.handle(req);
    }
}