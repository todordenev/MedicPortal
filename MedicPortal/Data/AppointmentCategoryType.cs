namespace MedicPortal.Data
{
    public static class AppointmentCategoryType
    {
        /// <summary>
        ///     Appointment for medical tests
        /// </summary>
        public static int MedicalProcedure = 0;

        /// <summary>
        ///     Appointment for recipe
        /// </summary>
        public static int ForRecipe = 1;

        /// <summary>
        ///     Appointment for placeholder
        /// </summary>
        public static int NoAppointmentsType = 2;
    }
}