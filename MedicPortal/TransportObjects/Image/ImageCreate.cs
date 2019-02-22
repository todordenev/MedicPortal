using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace MedicPortal.TransportObjects.Image
{
    public class ImageCreate
    {
        public string Id { get; set; }
        public IFormFile ImageData { get; set; }
    }
}
