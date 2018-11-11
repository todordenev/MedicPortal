import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DoctorService } from '@app/core/services';

@Component({
  selector: 'app-account-view',
  templateUrl: './account-view.component.html',
  styleUrls: ['./account-view.component.css']
})
export class AccountViewComponent implements OnInit {

  activation: string;
  constructor(private route: ActivatedRoute, private doctorService: DoctorService) { }

  ngOnInit() {
    this.activation = this.route.snapshot.paramMap.get('activation');
  }

}
