using Api.Models;
using BCrypt.Net;
using Microsoft.EntityFrameworkCore;

namespace Api.Data
{
    public class ApiContext : DbContext
    {
        public ApiContext(DbContextOptions<ApiContext> options):base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);


            var seedDate = new DateTime(2025, 11, 8, 12, 0, 0);
            var fixedPasswordHash = "$2a$11$N1lR9YQh1W5kXFx4hGJbF.zKpPvjI3r9g6tA1x5oqYm0yF6bJ5dQO";


            modelBuilder.Entity<Todo>().HasData(
                new Todo
                {
                    Id = 1,
                    Title = "Learn C#",
                    IsCompleted = false,
                    UserId = 1,
                    CreatedAt = seedDate,
                    UpdatedAt = seedDate
                },
                new Todo
                {
                    Id = 2,
                    Title = "Build an API",
                    IsCompleted = false,
                    UserId = 1,
                    CreatedAt = seedDate,
                    UpdatedAt = seedDate
                },
                new Todo
                {
                    Id = 3,
                    Title = "Write Documentation",
                    IsCompleted = false,
                    UserId = 2,
                    CreatedAt = seedDate,
                    UpdatedAt = seedDate
                }
                );

            modelBuilder.Entity<User>().HasData(
                new User
                {
                    Id = 1,
                    Username = "user1",
                    Email = "user2@email.test",
                    PasswordHash = fixedPasswordHash,
                    CreatedAt = seedDate,
                    UpdatedAt = seedDate
                },
                new User
                {
                    Id = 2,
                    Username = "user2",
                    Email = "user2@email.test",
                    PasswordHash = fixedPasswordHash,
                    CreatedAt = seedDate,
                    UpdatedAt = seedDate
                }
                );

        }

        public DbSet<Todo> Todos { get; set; }
        public DbSet<User> Users { get; set; }

        }
}
