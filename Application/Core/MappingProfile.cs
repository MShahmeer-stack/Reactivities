using AutoMapper;
using Domain;
using Application.Activities;
using System.Linq;
namespace Application.Core
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap <Activity ,Activity>();
              CreateMap <Activity ,ActivityDto>()           
              .ForMember(d => d.HostUserName , o => o.MapFrom(s => s.Attendees 
              .FirstOrDefault( x => x.IsHost).AppUser.UserName));

              CreateMap<UserActivity , Profiles.Profile>()
              .ForMember(d => d.DisplayName , o=>o.MapFrom( s=> s.AppUser.DisplayName))
               .ForMember(d => d.UserName , o=>o.MapFrom( s=> s.AppUser.UserName))
                .ForMember(d => d.Bio , o=>o.MapFrom( s=> s.AppUser.Bio));
        }
    }
}