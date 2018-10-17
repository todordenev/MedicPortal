import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
  @Output()
  onLinkClicked = new EventEmitter<boolean>();
  
  ngOnInit() { }

  constructor() {  }


  clicked() {
    this.onLinkClicked.emit();
  }
}
