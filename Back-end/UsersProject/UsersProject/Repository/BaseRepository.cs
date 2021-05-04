using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UsersProject.Persistence;

namespace UsersProject.Repository
{ 
    //Class that represents a general repository. 
    public class BaseRepository
    {
        protected readonly DatabaseContext _databaseContext;

        public BaseRepository(DatabaseContext databaseContext)
        {
            _databaseContext = databaseContext;
        }

    }
}
