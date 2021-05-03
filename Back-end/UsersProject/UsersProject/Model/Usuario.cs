using System;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace UsersProject.Model
{

    /**
     * Class that represents the model to User data.
     **/
    public class Usuario
    {
        public enum SexoEnum
        {
            F, M, O
        }

        public Guid Id { get; set; }
        public string Nome { get; set; }
        public string Cpf { get; set; }
        public string Email { get; set; }
        public string Telefone { get; set; }
        public string Sexo { get; set; }
        public DateTime DataNascimento { get; set; }
        
    }
}
