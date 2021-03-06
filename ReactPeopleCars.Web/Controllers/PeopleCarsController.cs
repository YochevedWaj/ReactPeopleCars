using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using ReactPeopleCars.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactPeopleCars.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PeopleCarsController : ControllerBase
    {
        private readonly string _connectionString;

        public PeopleCarsController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [HttpGet]
        [Route("getall")]
        public List<Person> GetAll()
        {
            var repo = new PeopleCarsRepository(_connectionString);
            return repo.GetAll();
        }

        [HttpPost]
        [Route("addperson")]      
        public void AddPerson(Person person)
        {
            var repo = new PeopleCarsRepository(_connectionString);
            repo.AddPerson(person);

        }

        [HttpPost]
        [Route("addcar")]     
        public void AddCar(Car car)
        {
            var repo = new PeopleCarsRepository(_connectionString);
            repo.AddCar(car);

        }

        [HttpPost]
        [Route("DeleteCarsForPerson")]
        public void DeleteCarsForPerson(Person person)
        {
            var repo = new PeopleCarsRepository(_connectionString);
            repo.DeleteCarsForPerson(person.ID);
        }

        [HttpGet]
        [Route("getbyid")]
        public Person GetByID(int id)
        {
            var repo = new PeopleCarsRepository(_connectionString);
            return repo.GetByID(id);
        }
    }
}
