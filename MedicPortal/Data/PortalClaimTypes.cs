namespace MedicPortal.Data
{
    public static class PortalClaimTypes
    {
        //Das Claim erlaubt das Editieren von Doctor Objekte. Der Wert des Claims enstpricht das ID des Doctors
        public const string DoctorManagePermission = "doctor-manage";

        //Das Claim erlaubt das Editieren von Patient Objekte. Der Wert des Claims enstpricht das ID des Patients
        public const string PatientManagePermission = "patient-permission";

        //Das Claim erlaubt das hinzufügen von Termine bei dem Doctor mit der ID im Wert des Claims
        public const string MakeAppointments = "make-appointments";
    }
}