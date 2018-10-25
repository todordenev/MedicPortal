namespace MedicPortal.Helpers
{
    public static class Constants
    {
        public static class JwtClaimIdentifiers
        {
            public const string Rol = "role";
            public const string Id = "id";
            public static string Phone = "phone";
        }

        public static class RoleNames
        {
            public const string Admin = "admin";
            public const string DoctorManager = "doctor-manager";
        }
    }
}