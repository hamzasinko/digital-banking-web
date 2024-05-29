import { Component } from '@angular/core';
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-admin-template',
  templateUrl: './admin-template.component.html',
  styleUrl: './admin-template.component.css'
})
export class AdminTemplateComponent {
  constructor(protected authService:AuthService) {
  }
  getFormattedRoles(): string {
    const roles = this.authService.getRoles();
    if (roles.length === 0) return '';
    if (roles.length === 1) return roles[0];
    return roles.slice(0, -1).join(', ') + ' and ' + roles[roles.length - 1];
  }
}
