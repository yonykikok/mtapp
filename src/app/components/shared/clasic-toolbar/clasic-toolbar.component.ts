import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-clasic-toolbar',
  templateUrl: './clasic-toolbar.component.html',
  styleUrls: ['./clasic-toolbar.component.scss'],
})
export class ClasicToolbarComponent implements OnInit {
  @Input() title;
  constructor() { }

  ngOnInit() { }

}
