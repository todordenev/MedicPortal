using System.IO;
using System.Linq;
using System.Threading.Tasks;
using MedicPortal.Data;
using MedicPortal.Data.Models;
using MedicPortal.Helpers;
using MedicPortal.TransportObjects.Image;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MedicPortal.Controllers
{
    [Route("api/images")]
    [ApiController]
    [Authorize]
    public class ImageController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;

        public ImageController(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var imageIds = await _dbContext.Images
                .Select(img => new ImageView {Id = img.Id, Src = "/api/images/" + img.Id}).ToListAsync();
            return Ok(imageIds);
        }

        // GET: api/Image/5
        [HttpGet("{id}", Name = "Get")]
        public FileStreamResult Get(string id)
        {
            var image = _dbContext.Images.Find(id);
            return new FileStreamResult(new MemoryStream(image.ImageBytes), image.ContentType);
        }

        // POST: api/Image
        [HttpPost]
        public async Task<IActionResult> Post([FromForm] ImageCreate imageCreate)
        {
            using (var memoryStream = new MemoryStream())
            {
                await imageCreate.ImageData.CopyToAsync(memoryStream);
                var image = new Image
                {
                    ImageBytes = memoryStream.ToArray(),
                    ContentType = imageCreate.ImageData.ContentType,
                    RessourceOwnerId = User.GetUserId()
                };
                _dbContext.Images.Add(image);
                _dbContext.SaveChanges();
                return Ok(new {id = image.Id, url = "/api/images/" + image.Id});
            }
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var image = await _dbContext.Images.FindAsync(id);
            if (image == null)
            {
                return NotFound();
            }

            if (image.RessourceOwnerId == User.GetUserId() || User.IsPortalAdmin())
            {
                _dbContext.Images.Remove(image);
                _dbContext.SaveChanges();
                return Ok();
            }

            return Unauthorized();
        }
    }
}