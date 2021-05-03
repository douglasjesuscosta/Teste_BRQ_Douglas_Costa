using System;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;


using UsersProject.Model;
using UsersProject.Persistence;
using UsersProject.RepositoryInterface;
using UsersProject.DTO;

namespace UsersProject.Repository
{
    public class UserRepository : BaseRepository, IUserRepository
    {
        
        public UserRepository(DatabaseContext databaseContext) : base(databaseContext)
        {
        }

        public Usuario Create(Usuario usuario)
        {
            var user = _databaseContext.Users.Add(usuario).Entity;
            _databaseContext.SaveChanges();

            return user;
        }

        public Usuario FindById(Guid id)
        {
            return  _databaseContext.Users.Find(id);
        }

        public async Task<IEnumerable<Usuario>> ListUsers()
        {
            return await _databaseContext.Users.ToListAsync();
        }

        public void Remove(Usuario usuario)
        {
            _databaseContext.Users.Remove(usuario);
            _databaseContext.SaveChanges();
        }

        public void Remove(Guid id)
        {
            Usuario usuario = new Usuario();
            usuario.Id = id;

           _databaseContext.Remove(usuario);
            _databaseContext.SaveChanges();
        }

        public void Update(Usuario usuario)
        {
            _databaseContext.Users.Update(usuario);
            _databaseContext.SaveChanges();
        }
    }
}
