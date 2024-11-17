import { Component } from '@angular/core';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, fab); 
  }
}
