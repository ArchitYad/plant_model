import { Component } from '@angular/core';
import { HomeComponent } from "../home/home.component";
import { RouterModule } from '@angular/router';
import { NavbarComponent } from "../components/navbar/navbar.component";
import { FooterComponent } from "../components/footer/footer.component";
@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [RouterModule,NavbarComponent, FooterComponent],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent {

}
