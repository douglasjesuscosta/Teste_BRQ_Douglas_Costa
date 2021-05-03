using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using UsersProject.Model;

namespace UsersProject.RepositoryInterface
{
    public interface IUserRepository
    {
        Task<IEnumerable<Usuario>> ListUsers();

        Usuario Create(Usuario usuario);

        Usuario FindById(Guid id);

        void Update(Usuario usuario);

        void Remove(Usuario usuario);

        void Remove(Guid id);
    
    }
}
