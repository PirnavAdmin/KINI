using Microsoft.AspNetCore.Mvc;
using Registerkini.DTOs;
using Registerkini.Repository;

namespace Registerkini.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegisterController : ControllerBase
    {
        private readonly IRegisterRepository _repository;

        public RegisterController(IRegisterRepository repository)
        {
            _repository = repository;
        }

        // POST: api/Register
        [HttpPost]
        public async Task<IActionResult> Register([FromBody] RegistrationDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var result = await _repository.CreateAsync(dto);

                return Ok(new
                {
                    Success = true,
                    Message = "Registration completed successfully.",
                    Data = result
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    Success = false,
                    Message = ex.Message
                });
            }
        }

        // GET: api/Register
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var result = await _repository.GetAllAsync();

            return Ok(new
            {
                Success = true,
                Message = "Registrations retrieved successfully.",
                Data = result
            });
        }

        // GET: api/Register/5
        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            var result = await _repository.GetByIdAsync(id);

            if (result == null)
            {
                return NotFound(new
                {
                    Success = false,
                    Message = "Registration not found."
                });
            }

            return Ok(new
            {
                Success = true,
                Message = "Registration retrieved successfully.",
                Data = result
            });
        }
    }
}