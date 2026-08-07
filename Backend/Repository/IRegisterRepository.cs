using Registerkini.DTOs;
using Registerkini.Models;

namespace Registerkini.Repository
{
    public interface IRegisterRepository
    {
        Task<List<Registration>> GetAllAsync();
        Task<Registration?> GetByIdAsync(int id);
        Task<Registration> CreateAsync(RegistrationDto dto);
    }
}