using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using FluentValidation;
using MediatR;
using Persistance;
using Application.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;
using System.Linq;
using AutoMapper;
using AutoMapper.QueryableExtensions;


namespace Application.Profiles
{
    public class Details
    {
           public class Query: IRequest<Result<Profile>>
        {
            public string UserName { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Profile>>
        {
            private readonly DataContext _context;
             private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper )
            {
                
                _context = context;
                _mapper =  mapper;
            }

               public async Task<Result<Profile>> Handle(Query request, CancellationToken cancellationToken)
               {
                    var user = await _context.Users
                    .ProjectTo<Profile>(_mapper.ConfigurationProvider)
                   .SingleOrDefaultAsync(x=> x.UserName == request.UserName);

                   

                return Result<Profile>.Success(user);


               }

        }
    }
}