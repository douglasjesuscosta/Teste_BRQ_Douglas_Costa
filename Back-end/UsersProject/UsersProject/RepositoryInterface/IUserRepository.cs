using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using UsersProject.Model;

namespace UsersProject.RepositoryInterface
{
    public interface IUserRepository
    {
        //Description of Method that must return a List of users.
        Task<IEnumerable<Usuario>> ListUsers();

        //Method that must persist a given user.
        Usuario Create(Usuario usuario);

        //Method that must return an User with a given id.
        Usuario FindById(Guid id);

        //Method that must update a given user on database.
        void Update(Usuario usuario);

        //Method that must remove a given user on database.
        void Remove(Usuario usuario);

        //Method that must remove a user based on a given id.
        void Remove(Guid id);
    
    }
}
