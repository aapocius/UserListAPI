using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<TodoDb>(opt => opt.UseInMemoryDatabase("TodoList"));
builder.Services.AddDatabaseDeveloperPageExceptionFilter();
builder.Services.AddCors(options => options.AddDefaultPolicy(policy => policy.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin()));

var app = builder.Build();
app.UseCors();

app.MapGet("/useritemsid", async (TodoDb db) =>
    await db.Todos.ToListAsync());

app.MapGet("/useritemsid/{id}", async (int id, TodoDb db) =>
    await db.Todos.FindAsync(id)
        is Todo todo
            ? Results.Ok(todo)
            : Results.NotFound("not found"));

app.MapPost("/useritemsid", async (Todo todo, TodoDb db) =>
{

  db.Todos.Add(todo);
  await db.SaveChangesAsync();

  return Results.Created($"/useritemsid/{todo.Id}", todo);
});

app.MapPut("/useritemsid/{id}", async (int id, Todo inputTodo, TodoDb db) =>
{
  var todo = await db.Todos.FindAsync(id);

  if (todo is null) return Results.NotFound();

  todo.Name = inputTodo.Name;
  todo.Age = inputTodo.Age;
  todo.LastName = inputTodo.LastName;
  todo.Email = inputTodo.Email;
  todo.AvatarColor = inputTodo.AvatarColor;

  await db.SaveChangesAsync();

  return Results.NoContent();
});

app.MapDelete("/useritemsid/{id}", async (int id, TodoDb db) =>
{
  if (await db.Todos.FindAsync(id) is Todo todo)
  {
    db.Todos.Remove(todo);
    await db.SaveChangesAsync();
    return Results.Ok(todo);
  }

  return Results.NotFound();
});

app.Run();