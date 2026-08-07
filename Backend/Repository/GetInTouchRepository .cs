using Microsoft.EntityFrameworkCore;
using Registerkini.Data;
using Registerkini.DTOs;
using Registerkini.Interfaces;
using Registerkini.Models;

namespace Registerkini.Repositories
{
    public class GetInTouchRepository : IGetInTouchRepository
    {
        private readonly ApplicationDbContext _context;

        public GetInTouchRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<GetInTouch> CreateAsync(GetInTouchDto dto)
        {
            var entity = new GetInTouch
            {
                Name = dto.Name,
                Email = dto.Email,
                MobileNumber = dto.MobileNumber,
                Subject = dto.Subject,
                Message = dto.Message
            };

            _context.GetInTouches.Add(entity);
            await _context.SaveChangesAsync();

            return entity;
        }

        public async Task<List<GetInTouch>> GetAllAsync()
        {
            return await _context.GetInTouches
                .OrderByDescending(x => x.Id)
                .ToListAsync();
        }

        public async Task<GetInTouch?> GetByIdAsync(int id)
        {
            return await _context.GetInTouches.FindAsync(id);
        }
    }
}