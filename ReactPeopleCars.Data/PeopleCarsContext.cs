using Microsoft.EntityFrameworkCore;
using System;

namespace ReactPeopleCars.Data
{
    public class PeopleCarsContext : DbContext
    {
        private string _connectionString;
        public PeopleCarsContext(string connectionString)
        {
            _connectionString = connectionString;
        }

        public DbSet<Person> People { get; set; }
        public DbSet<Car> Cars { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(_connectionString);
        }
    }
}
