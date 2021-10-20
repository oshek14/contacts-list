import { ChangeDetectionStrategy, Component, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'cl-button',
  templateUrl: './cl-button.component.html',
  styleUrls: ['./cl-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClButtonComponent implements OnInit {

  @Input() text: string = '';
  @Input() type: string = 'button';

  constructor() { }

  ngOnInit(): void {
  }

}
