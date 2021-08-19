using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistance;
using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;


/*
Handler functionality:


1- If user going to activity and is not the host => giving option to remove itself
2- If user is not going to activity and not the host => giving option to add itself
3- If user is host of the activity => give option to cancel the activity

*/

namespace Application.Activities
{
    public class UpdateAttendance
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;

            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities
                .Include(a => a.Attendees)
                .ThenInclude(u => u.AppUser)
                .FirstOrDefaultAsync(x => x.Id == request.Id);

                 if (activity == null) return null;

                 var user = await _context.Users.FirstOrDefaultAsync(x =>
                                                            x.UserName == _userAccessor.GetUsername());

                 if (user == null) return null; 


                 var HostUserName = activity.Attendees.FirstOrDefault(x=>
                                                    x.IsHost)?.AppUser?.UserName;

                  var attendance = activity.Attendees.FirstOrDefault(x=>x.AppUser.UserName == user.UserName);

                    if(attendance != null && HostUserName == user.UserName){
                        activity.IsCancelled = !activity.IsCancelled;
                        }
                        

                    if(attendance != null && HostUserName != user.UserName){
                         activity.Attendees.Remove(attendance);
                    }
                       

                    if(attendance == null){
                            attendance =  new UserActivity{
                                AppUser = user,
                                Activity = activity,
                                IsHost =false
                            };

                            activity.Attendees.Add(attendance);

                    }
                    var result = await _context.SaveChangesAsync() > 0;

                    return result ? Result<Unit>.Success(Unit.Value) :  Result<Unit>.Failure("Problem Updating Attendance");

            }


        }







    }
}