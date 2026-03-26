using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebHexagon.Data;
using WebHexagon.Models;

namespace WebHexagon.Controllers
{
    [Authorize] // Somente Logado
    [ApiController]
    [Route("api/[controller]")]
    public class PessoaController : ControllerBase
    {
        private readonly AppDbContext _context;
        public PessoaController(AppDbContext context)
        {
            _context = context;
        }

        //GET
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_context.Pessoas.ToList());
        }

        //GET_ID Buscando pelo id para editar
        [HttpGet("{id}")]
        public async Task<ActionResult<Pessoa>> GetById(int id)
        {
            var pessoa = await _context.Pessoas.FindAsync(id);
            if (pessoa == null) {
                return NotFound();
            }
            return pessoa;
        }

        //POST
        [HttpPost]
        public IActionResult Post(Pessoa pessoa)
        {
           var verificarCpf = _context.Pessoas.Any(p => p.CPF == pessoa.CPF);

            if(verificarCpf)
            {
                return Conflict("CPF já cadastrado.");
            }           

            _context.Pessoas.Add(pessoa);
            _context.SaveChanges();
            return Ok(pessoa);
        }

        //PUT
        [HttpPut("{id}")]
        public IActionResult Put(int id, Pessoa pessoa)
        {
            var p = _context.Pessoas.Find(id);

            if (p == null)
                return NotFound();

            p.Nome = pessoa.Nome;
            p.Idade = pessoa.Idade;
            p.EstadoCivil = pessoa.EstadoCivil;
            p.CPF = pessoa.CPF;
            p.Cidade = pessoa.Cidade;
            p.Estado = pessoa.Estado;

            _context.SaveChanges();

            return Ok(p);

        }

        //DELETE
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var p = _context.Pessoas.Find(id);
            if (p == null)
                return NotFound();
            _context.Pessoas.Remove(p);
            _context.SaveChanges();

            return Ok();
        }
    }
}
