import { Component } from '@angular/core';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css']
})
export class PlanComponent {

  upgradePlan(): void {
    alert('Your plan has been upgraded to Premium!');
    
  }
}