import { Component, OnInit } from '@angular/core';
import { Doctor } from '@app/core/entities';
import { DoctorService } from '@app/core/services';

@Component({
  selector: 'app-doctor-mylist',
  templateUrl: './doctor-mylist.component.html',
  styleUrls: ['./doctor-mylist.component.css']
})
export class DoctorMylistComponent implements OnInit {
  doctors: Doctor[] = [];
  constructor(private doctorService: DoctorService) { }

  ngOnInit() {
    this.doctorService.getMyDoctors().subscribe((doctors) => this.doctors = doctors);
  }

}
