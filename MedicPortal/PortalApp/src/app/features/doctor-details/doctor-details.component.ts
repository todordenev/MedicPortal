import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Doctor } from '@app/core/entities';
import { DoctorService } from '@app/core/services';

@Component({
  selector: 'app-doctor-details',
  templateUrl: './doctor-details.component.html',
  styleUrls: ['./doctor-details.component.css']
})
export class DoctorDetailsComponent implements OnInit {

  doctor: Doctor;
  constructor(private doctorService: DoctorService, private route: ActivatedRoute) { }

  viewDate = new Date();

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.doctorService.getDoctor(id).subscribe((doc: Doctor) => this.doctor = doc);
  }
  get imageUrl() {
    return './assets/doctor_' + this.doctor.id + '.jpg';
  }
}
