using System;
using MediatR;
using Application.Core;
using System.Threading;
using System.Threading.Tasks; 
using Domain;
using FluentValidation;
using Persistance;
using Application.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;
using System.Linq;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using System.Collections.Generic;



namespace Application.Comments
{
    public class List
    {
        public class Query : IRequest<Result<List<CommentDto>>>
        {
            public Guid ActivityId {get; set;}
        }

        public class Handler :IRequestHandler<Query , Result<List<CommentDto>>>
        {
             private readonly DataContext _context;
              private readonly IUserAccessor _userAccessor;
        private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper,IUserAccessor userAccessor)
            {
            _mapper = mapper;
                _userAccessor = userAccessor;
                _context = context;
            }

            public async Task<Result<List<CommentDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                    var comments = await _context.Comments
                    .Where(x =>x.Activity.Id == request.ActivityId)
                    .OrderByDescending(x=>x.CreatedAt)
                    .ProjectTo<CommentDto>(_mapper.ConfigurationProvider)
                    .ToListAsync();



                    return Result<List<CommentDto>>.Success(comments);
                

                    
            }
        }
    }
}