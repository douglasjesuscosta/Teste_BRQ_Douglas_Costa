using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UsersProject.DTO;

namespace UsersProject.ServicesInterfaces
{
    public interface IUserService
    {
        //Method that should return a list of Usuario.
        Task<IEnumerable<UsuarioDTO>> ListUser();

        //Method that should create a Usuario receiving an UsuarioDTO.
        UsuarioDTO CreateUser(UsuarioDTO usuarioDTO);

        //Method that should update a Usuario receiving an UsuarioDTO.
        void UpdateUser(UsuarioDTO usuarioDTO);

        //Method that gets a user by id.
        UsuarioDTO GetUserById(String idUser);

        //Method that delete a given UsuarioDTO.
        void DeleteUser(String idUser);

    }
}
