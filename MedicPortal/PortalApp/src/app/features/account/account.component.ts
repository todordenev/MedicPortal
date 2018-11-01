import { Component, OnInit } from '@angular/core';
import { Route, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  activation: string;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.activation = this.route.snapshot.paramMap.get('activation');
  }

}
