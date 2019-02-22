namespace MedicPortal.Data.Models
{
    public class Image
    {
        public string Id { get; set; }
        public byte[] ImageBytes { get; set; }
        public string ContentType { get; set; }
    }
}