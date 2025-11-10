using Api.Data;
using Api.DTOs;
using Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace FirstAPI.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class TodosController : ControllerBase
    {

        private readonly ApiContext _context;
        public TodosController(ApiContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<TodoDto>>> GetTodos()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim.Value == null)
                return Unauthorized();

            int userId = int.Parse(userIdClaim.Value);

            var todos = await _context.Todos
                .Where(t => t.UserId == userId)
                .Select(t => new TodoDto
                {
                    Id = t.Id,
                    Title = t.Title,
                    IsCompleted = t.IsCompleted,
                    CreatedAt = t.CreatedAt,
                    UpdatedAt = t.UpdatedAt
                })
                .ToListAsync();

            return Ok(todos);
        }
        [HttpPost]
        public async Task<ActionResult<TodoDto>> AddTodo(TodoDto newTodo)
        {

            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim.Value == null)
                return Unauthorized();

            int userId = int.Parse(userIdClaim.Value);

            if (string.IsNullOrWhiteSpace(newTodo.Title))
                return BadRequest("Title cannot be empty.");
            if (newTodo.Title.Length > 200)
                return BadRequest("Title exceeds maximum length of 200 characters.");

            var todo = new Todo 
            { 
                Title = newTodo.Title,
                UserId = userId
            };

            _context.Todos.Add(todo);
            await _context.SaveChangesAsync();

            var todoDto = new TodoDto
            {
                Id = newTodo.Id,
                Title = newTodo.Title,
                IsCompleted = newTodo.IsCompleted,
                CreatedAt = newTodo.CreatedAt,
                UpdatedAt = newTodo.UpdatedAt
            };

            return Ok(todoDto);
        }
        [HttpPut("{id}")]
        public async Task<ActionResult<TodoDto>> UpdateTodo(int id, TodoDto updatedTodo)
        {
            if (updatedTodo.Id != id)
                return BadRequest("Id in body does not match URL.");

            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim.Value == null)
                return Unauthorized();

            int userId = int.Parse(userIdClaim.Value);


            var todo = await _context.Todos
                .Where(t => t.Id == id && t.UserId == userId)
                .FirstOrDefaultAsync();

            if (todo == null)
                return NotFound();

            todo.IsCompleted = updatedTodo.IsCompleted;
            todo.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            var todoDto = new TodoDto
            {
                Id = todo.Id,
                Title = todo.Title,
                IsCompleted = todo.IsCompleted,
                CreatedAt = todo.CreatedAt,
                UpdatedAt = todo.UpdatedAt
            };

            return Ok(todoDto);
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteTodo(int id)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim.Value == null)
                return Unauthorized();

            int userId = int.Parse(userIdClaim.Value);


            var todo = await _context.Todos
                .Where(t => t.Id == id && t.UserId == userId)
                .FirstOrDefaultAsync();

            if (todo == null)
                return NotFound();

            _context.Todos.Remove(todo);
            await _context.SaveChangesAsync();
            return NoContent();
        }

    }
}
