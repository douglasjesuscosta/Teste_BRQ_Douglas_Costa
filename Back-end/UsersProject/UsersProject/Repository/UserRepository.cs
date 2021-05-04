using System;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

using UsersProject.Model;
using UsersProject.Persistence;
using UsersProject.RepositoryInterface;


namespace UsersProject.Repository
{
    //Class that implements the UserRepository with operations with user Entity on database.
    public class UserRepository : BaseRepository, IUserRepository
    {
        public UserRepository(DatabaseContext databaseContext) : base(databaseContext)
        {
        }

        //Method to persist a new user on database.
        public Usuario Create(Usuario usuario)
        {
            var user = _databaseContext.Users.Add(usuario).Entity;
            _databaseContext.SaveChanges();

            return user;
        }

        //Method to return a User with a given id.
        public Usuario FindById(Guid id)
        {
            return  _databaseContext.Users.Find(id);
        }

        //Method to list all users.
        public async Task<IEnumerable<Usuario>> ListUsers()
        {
            return await _databaseContext.Users.ToListAsync();
        }

        //Method to remove a given user.
        public void Remove(Usuario usuario)
        {
            _databaseContext.Users.Remove(usuario);
            _databaseContext.SaveChanges();
        }

        //Method to remove an User with a given id.
        public void Remove(Guid id)
        {
            Usuario usuario = new Usuario();
            usuario.Id = id;

           _databaseContext.Remove(usuario);
            _databaseContext.SaveChanges();
        }

        //Method to update a given user.
        public void Update(Usuario usuario)
        {
            _databaseContext.Users.Update(usuario);
            _databaseContext.SaveChanges();
        }
    }
}
