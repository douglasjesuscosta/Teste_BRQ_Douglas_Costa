using System;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;

using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

using UsersProject.ServicesInterfaces;
using UsersProject.DTO;

namespace UsersProject.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
      
        private readonly ILogger<UserController> _logger;
        private readonly IUserService _userService;

        public UserController(ILogger<UserController> logger,
                              IUserService userService)
        {
            _logger = logger;
            _userService = userService;
        }

        [HttpPost]
        public UsuarioDTO CreateUser(UsuarioDTO userDTO)
        {
            return _userService.CreateUser(userDTO);
        }

        [HttpPut]
        public void UpdateUser(UsuarioDTO userDTO)
        {
            _userService.UpdateUser(userDTO);
        }

        [HttpGet("{idUser}")]
        public UsuarioDTO GetUser(String idUser)
        {
            return _userService.GetUserById(idUser);
        }


        [HttpGet]
        public async Task<IEnumerable<UsuarioDTO>> GetAllUsers()
        {
            var users = await _userService.ListUser();
            return users;
            
        }

        [HttpDelete("{idUser}")]
        public void DeleteUser(String idUser)
        {
            _userService.DeleteUser(idUser);
        }
    }
}
