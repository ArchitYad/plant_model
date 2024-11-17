import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from "../components/navbar/navbar.component";
import { FooterComponent } from "../components/footer/footer.component";
@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterModule, NavbarComponent, FooterComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

}
