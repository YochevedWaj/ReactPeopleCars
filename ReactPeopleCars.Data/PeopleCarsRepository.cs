using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReactPeopleCars.Data
{
    public class PeopleCarsRepository
    {
        private string _connectionString;
        public PeopleCarsRepository(string connectionString)
        {
            _connectionString = connectionString;
        }
        public List<Person> GetAll()
        {
            using var context = new PeopleCarsContext(_connectionString);
            return context.People.Include(p => p.Cars).ToList();
        }

        public Person GetByID(int id)
        {
            using var context = new PeopleCarsContext(_connectionString);
            return context.People.Include(p => p.Cars).FirstOrDefault(p => p.ID == id);
        }

        public void AddPerson(Person person)
        {
            using var context = new PeopleCarsContext(_connectionString);
            context.People.Add(person);
            context.SaveChanges();
        }

        public void AddCar(Car car)
        {
            using var context = new PeopleCarsContext(_connectionString);
            context.Cars.Add(car);
            context.SaveChanges();
        }

        public void DeleteCarsForPerson(int personID)
        {
            using var context = new PeopleCarsContext(_connectionString);
            context.Database.ExecuteSqlInterpolated($"DELETE FROM Cars WHERE PersonID = {personID}");
        }
    }
}
