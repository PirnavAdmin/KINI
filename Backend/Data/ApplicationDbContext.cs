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

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Registration>().ToTable("registrations");
            modelBuilder.Entity<GetInTouch>().ToTable("getintouches");
        }
    }
}
