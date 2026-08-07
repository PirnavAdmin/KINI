using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using Registerkini.Models;

namespace Registerkini.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Registration> Registrations { get; set; }

        public DbSet<GetInTouch> GetInTouches { get; set; }

    }
}