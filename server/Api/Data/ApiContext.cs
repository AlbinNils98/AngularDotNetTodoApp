using Api.Models;
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

            modelBuilder.Entity<Book>().HasData(
                new Book
                {
                    Id = 1,
                    Title = "1984",
                    Author = "George Orwell",
                    YearPublished = 1949
                },
                new Book
                {
                    Id = 2,
                    Title = "To Kill a Mockingbird",
                    Author = "Harper Lee",
                    YearPublished = 1960
                },
                new Book
                {
                    Id = 3,
                    Title = "The Great Gatsby",
                    Author = "F. Scott Fitzgerald",
                    YearPublished = 1925
                }
                );

            modelBuilder.Entity<Todo>().HasData(
                new Todo
                {
                    Id = 1,
                    Title = "Learn C#",
                    IsCompleted = false
                },
                new Todo
                {
                    Id = 2,
                    Title = "Build an API",
                    IsCompleted = false
                },
                new Todo
                {
                    Id = 3,
                    Title = "Write Documentation",
                    IsCompleted = false
                }
                );

        }

        public DbSet<Book> Books { get; set; }
        public DbSet<Todo> Todos { get; set; }

    }
}
