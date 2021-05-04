using System;
using System.Threading.Tasks;
using System.Collections.Generic;

using UsersProject.DTO;
using UsersProject.Model;
using UsersProject.RepositoryInterface;
using UsersProject.ServicesInterfaces;

namespace UsersProject.Business
{
    //Class that implements the business logic related to User operations.
    public class  UserService : IUserService
    {

        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }


        //Method that should return a IEnumerable of UsuarioDTO.
        public async Task<IEnumerable<UsuarioDTO>> ListUser()
        {
            IEnumerable<Usuario> listUsers = await _userRepository.ListUsers();
            IList<UsuarioDTO> listUsersDTO = new List<UsuarioDTO>();

            foreach(Usuario user in listUsers)
            {
                UsuarioDTO userDTO = ConvertToDTO(user);
                listUsersDTO.Add(userDTO);
            }
            
            return listUsersDTO;
        }

        //Method that must create a new Usuario.
        public UsuarioDTO CreateUser(UsuarioDTO usuarioDTO)
        {
            Usuario usuario = ConvertFromDTO(usuarioDTO);

            usuario = _userRepository.Create(usuario);
            usuarioDTO = ConvertToDTO(usuario);

            return usuarioDTO;
        }

         //Method to get a user by Id.
        public UsuarioDTO GetUserById(string idUser)
        {
            Guid id = Guid.Parse(idUser);
            Usuario usuario = _userRepository.FindById(id);
            UsuarioDTO usuarioDTO = ConvertToDTO(usuario);

            return usuarioDTO;
        }

        //Method to update an User.
        public void UpdateUser(UsuarioDTO usuarioDTO)
        {
            Usuario usuario = ConvertFromDTO(usuarioDTO);
            _userRepository.Update(usuario);
        }

        //Method to delete a given User.
        public void DeleteUser(String idUser)
        {
            Usuario usuario = new Usuario();
            usuario.Id = Guid.Parse(idUser);
            _userRepository.Remove(usuario);
        }

        //Method to convert an Usuario to UsuarioDTO.
        private UsuarioDTO ConvertToDTO(Usuario user)
        {
            UsuarioDTO usuarioDTO = new UsuarioDTO();

            usuarioDTO.id = user.Id.ToString();
            usuarioDTO.name = user.Nome;
            usuarioDTO.telephone = user.Telefone;
            usuarioDTO.sex = user.Sexo;
            usuarioDTO.email = user.Email;
            usuarioDTO.birthday = user.DataNascimento.ToString("yyyy-MM-dd");
            usuarioDTO.cpf = user.Cpf;

            return usuarioDTO;
        }

        //Method to convert an UsuarioDTO to Usuario
        private Usuario ConvertFromDTO(UsuarioDTO userDTO)
        {
            Usuario usuario = new Usuario();
            usuario.Cpf = userDTO.cpf;
            usuario.Nome = userDTO.name;
            usuario.Id = userDTO.id != null ? Guid.Parse(userDTO.id) : Guid.NewGuid();
            usuario.Sexo = userDTO.sex;
            usuario.Telefone = userDTO.telephone;
            usuario.Email = userDTO.email;
            usuario.DataNascimento = DateTime.Parse(userDTO.birthday);

            return usuario;
        }
    }
}
