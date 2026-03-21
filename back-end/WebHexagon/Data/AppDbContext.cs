using Microsoft.EntityFrameworkCore;
using WebHexagon.Models;


namespace WebHexagon.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }
        public DbSet<Pessoa> Pessoas { get; set; }
    }
}
