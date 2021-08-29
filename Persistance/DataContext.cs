using Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace Persistance
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext( DbContextOptions options) : base(options)
        {
        }

        public DbSet<Activity> Activities { get; set; }

        public DbSet<UserActivity> UserActivities { get; set; }

        public DbSet<Photo> Photos { get; set; }

        public DbSet<Comment> Comments { get; set; }

        public DbSet<UserFollowing> UserFollowings { get; set; }


        protected override void OnModelCreating(ModelBuilder builder){
            
            base.OnModelCreating(builder);

            builder.Entity<UserActivity>(x => x.HasKey(m => new{m.AppUserId , m.ActivityId }));

            builder.Entity<UserActivity>()
            .HasOne(u => u.AppUser)
            .WithMany( n => n.Activities)
            .HasForeignKey( m=> m.AppUserId);

             builder.Entity<UserActivity>()
            .HasOne(u => u.Activity)
            .WithMany(n => n.Attendees)
            .HasForeignKey(m=>m.ActivityId);

            builder.Entity<Comment>()
            .HasOne(a=>a.Activity)
            .WithMany(c=>c.Comments)
            .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<UserFollowing>(b =>{
                b.HasKey(k => new {k.ObserverId , k.TargetId});

                b.HasOne(o=> o.Observer)
                .WithMany(f=> f.Followings)
                .HasForeignKey(o=> o.ObserverId)
                .OnDelete(DeleteBehavior.Cascade);

                b.HasOne(o=> o.Target)
                .WithMany(f=> f.Followers)
                .HasForeignKey(o=> o.TargetId)
                .OnDelete(DeleteBehavior.Cascade);
                
            });

          
        }
         
    }
}