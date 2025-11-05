using FirstAPI.Data;
using FirstAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FirstAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodosController : ControllerBase
    {

        private readonly FirstAPIContext _context;
        public TodosController(FirstAPIContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Todo>>> GetTodos()
        {
            return Ok(await _context.Todos.ToListAsync());
        }
        [HttpPost]
        public async Task<ActionResult<Todo>> AddTodo(Todo newTodo)
        {
            if (newTodo == null)
                return BadRequest();
            _context.Todos.Add(newTodo);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetTodos), new { id = newTodo.Id }, newTodo);
        }
        [HttpPut("{id}")]
        public async Task<ActionResult<Todo>> UpdateTodo(int id, Todo updatedTodo)
        {
            if (id != updatedTodo.Id)
                return BadRequest();
            var todo = await _context.Todos.FindAsync(id);
            if (todo == null)
                return NotFound();
            todo.Title = updatedTodo.Title;
            todo.IsCompleted = updatedTodo.IsCompleted;
            await _context.SaveChangesAsync();
            return Ok(todo);
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteTodo(int id)
        {
            var todo = await _context.Todos.FindAsync(id);
            if (todo == null)
                return NotFound();
            _context.Todos.Remove(todo);
            await _context.SaveChangesAsync();
            return NoContent();
        }

    }
}
