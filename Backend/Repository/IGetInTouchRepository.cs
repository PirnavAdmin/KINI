using Registerkini.DTOs;
using Registerkini.Models;

namespace Registerkini.Interfaces
{
    public interface IGetInTouchRepository
    {
        Task<GetInTouch> CreateAsync(GetInTouchDto dto);
        Task<List<GetInTouch>> GetAllAsync();
        Task<GetInTouch?> GetByIdAsync(int id);
    }
}