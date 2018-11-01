import { Component, OnInit } from '@angular/core';
import { Doctor } from '../../shared/doctor';
import { DoctorService } from '@app/core/doctor.service';

@Component({
  selector: 'app-doctor-mylist',
  templateUrl: './doctor-mylist.component.html',
  styleUrls: ['./doctor-mylist.component.css']
})
export class DoctorMylistComponent implements OnInit {
  doctors: Doctor[] = [];
  constructor(private doctorService: DoctorService) { }

  ngOnInit() {
    this.doctorService.getMyDoctors().subscribe((doctors: Doctor[]) => this.doctors = doctors);
  }

}
