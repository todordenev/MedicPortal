import { Component, OnInit } from '@angular/core';
import { Route, ActivatedRoute } from '@angular/router';
import { DoctorService } from '@app/core/doctor.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  activation: string;
  constructor(private route: ActivatedRoute, private doctorService: DoctorService) { }

  ngOnInit() {
    this.activation = this.route.snapshot.paramMap.get('activation');
  }

}
