using Microsoft.AspNetCore.Mvc;
using Registerkini.DTOs;
using Registerkini.Interfaces;

namespace Registerkini.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GetInTouchController : ControllerBase
    {
        private readonly IGetInTouchRepository _repository;

        public GetInTouchController(IGetInTouchRepository repository)
        {
            _repository = repository;
        }

        [HttpPost]
        public async Task<IActionResult> Create(GetInTouchDto dto)
        {
            var result = await _repository.CreateAsync(dto);

            return Ok(new
            {
                Success = true,
                Message = "Thank you for contacting us.",
                Data = result
            });
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _repository.GetAllAsync());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var result = await _repository.GetByIdAsync(id);

            if (result == null)
                return NotFound();

            return Ok(result);
        }
    }
}