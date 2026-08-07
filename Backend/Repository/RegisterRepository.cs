using Microsoft.EntityFrameworkCore;
using Registerkini.Data;
using Registerkini.DTOs;
using Registerkini.Models;

namespace Registerkini.Repository
{
    public class RegisterRepository : IRegisterRepository
    {
        private readonly ApplicationDbContext _context;

        public RegisterRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<Registration>> GetAllAsync()
        {
            return await _context.Registrations
                .OrderByDescending(x => x.Id)
                .ToListAsync();
        }

        public async Task<Registration?> GetByIdAsync(int id)
        {
            return await _context.Registrations
                .FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<Registration> CreateAsync(RegistrationDto dto)
        {
            if (await _context.Registrations.AnyAsync(x => x.Email == dto.Email))
            {
                throw new Exception("Email already registered.");
            }

            Registration registration = new Registration
            {
                Name = dto.Name,
                Email = dto.Email,
                MobileNumber = dto.MobileNumber,
                Qualification = dto.Qualification,
                Program = dto.Program
            };

            _context.Registrations.Add(registration);
            await _context.SaveChangesAsync();

            return registration;
        }
    }
}