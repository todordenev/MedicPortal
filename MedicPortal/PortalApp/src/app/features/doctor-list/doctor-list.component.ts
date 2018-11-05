import { Component, OnInit, Input } from '@angular/core';
import { DoctorService } from '@app/core/doctor.service';
import { Doctor } from '@app/shared/doctor';

@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.css']
})
export class DoctorListComponent implements OnInit {
  @Input()
  doctors: Doctor[];
  constructor(private doctorService: DoctorService) { }

  ngOnInit() {
    if (!this.doctors) {
      this.doctorService.getDoctors().subscribe((doctors: Doctor[]) => this.doctors = doctors);
    }
  }
}
