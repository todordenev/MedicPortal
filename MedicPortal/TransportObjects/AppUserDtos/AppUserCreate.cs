namespace MedicPortal.TransportObjects.AppUserDtos
{
    public class AppUserCreate
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PhoneNumber { get; set; }
        public string AvatarImageSrc { get; set; }
    }
}
