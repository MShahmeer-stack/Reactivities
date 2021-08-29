using AutoMapper;
using Domain;
using Application.Activities;
using System.Linq;
using Application.Comments;
using Application.Profiles;
namespace Application.Core
{
    public class MappingProfile : AutoMapper.Profile
    {
        public MappingProfile()
        {
            string currentUserName = null;
            CreateMap <Activity ,Activity>();
              CreateMap <Activity ,ActivityDto>()           
              .ForMember(d => d.HostUserName , o => o.MapFrom(s => s.Attendees 
              .FirstOrDefault( x => x.IsHost).AppUser.UserName));

              CreateMap<UserActivity , AttendeeDto>()
              .ForMember(d => d.DisplayName , o=>o.MapFrom( s=> s.AppUser.DisplayName))
               .ForMember(d => d.UserName , o=>o.MapFrom( s=> s.AppUser.UserName))
                .ForMember(d => d.Bio , o=>o.MapFrom( s=> s.AppUser.Bio))
                .ForMember(d => d.Image , o =>o.MapFrom(s => s.AppUser.Photos.FirstOrDefault(x=>x.IsMain).Url))
                  .ForMember(d=> d.FollowersCount , o=> o.MapFrom(s=> s.AppUser.Followers.Count))
            .ForMember(d=> d.FollowingCount , o=> o.MapFrom(s=> s.AppUser.Followings.Count))
             .ForMember(d=> d.Following , 
             o=> o.MapFrom(s=> s.AppUser.Followers.Any(x=> x.Observer.UserName == currentUserName)));

            CreateMap<AppUser , Profiles.Profile>()
            .ForMember(d => d.Image , o =>o.MapFrom(s => s.Photos.FirstOrDefault(x=>x.IsMain).Url))
            .ForMember(d=> d.FollowersCount , o=> o.MapFrom(s=> s.Followers.Count))
            .ForMember(d=> d.FollowingCount , o=> o.MapFrom(s=> s.Followings.Count))
             .ForMember(d=> d.Following , 
             o=> o.MapFrom(s=> s.Followers.Any(x=> x.Observer.UserName == currentUserName)));



            CreateMap<Comment , CommentDto>()
             .ForMember(d => d.DisplayName , o=>o.MapFrom( s=> s.Author.DisplayName))
               .ForMember(d => d.UserName , o=>o.MapFrom( s=> s.Author.UserName))
                .ForMember(d => d.Image , o =>o.MapFrom(s => s.Author.Photos.FirstOrDefault(x=>x.IsMain).Url));

               CreateMap<UserActivity, UserActivityDto>()
                .ForMember(d => d.Id, o => o.MapFrom(s => s.Activity.Id))
                .ForMember(d => d.Date, o => o.MapFrom(s => s.Activity.Date))
                .ForMember(d => d.Title, o => o.MapFrom(s => s.Activity.Title))
                .ForMember(d => d.Category, o => o.MapFrom(s => s.Activity.Category))
                .ForMember(d => d.HostUsername, o => o.MapFrom(s => 
                    s.Activity.Attendees.FirstOrDefault(x => x.IsHost).AppUser.UserName));
            
        }
    }
}