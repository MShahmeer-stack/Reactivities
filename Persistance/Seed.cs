using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;
using Persistance;
namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context,
            UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any() && !context.Activities.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser
                    {
                        DisplayName = "Bob",
                        UserName = "bob",
                        Email = "bob@test.com",
                        AccountNumber = "1234567890123456"
                    },
                    new AppUser
                    {
                        DisplayName = "Jane",
                        UserName = "jane",
                        Email = "jane@test.com",
                         AccountNumber = "1234567890123456"
                    },
                    new AppUser
                    {
                        DisplayName = "Tom",
                        UserName = "tom",
                        Email = "tom@test.com",
                        AccountNumber = "1234567890123456"
                    },
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }

                var activities = new List<Activity>
                {
                    new Activity
                    {
                        Title = "Past Activity 1",
                        Date = DateTime.Now.AddMonths(-2),
                        Description = "Activity 2 months ago",
                        Category = "donations",
                        City = "London",
                        Venue = "Pub",
                        Phone ="123456789",
                        Amount ="12345",
                        Attendees = new List<UserActivity>
                        {
                            new UserActivity
                            {
                                AppUser = users[0],
                                IsHost = true
                            }
                        }
                    },
                    new Activity
                    {
                        Title = "Past Activity 2",
                        Date = DateTime.Now.AddMonths(-1),
                        Description = "Activity 1 month ago",
                        Category = "blood",
                        City = "Paris",
                        Venue = "The Louvre",
                        Phone ="123456789",
                        Amount ="12345",
                        Attendees = new List<UserActivity>
                        {
                            new UserActivity
                            {
                                AppUser = users[0],
                                IsHost = true
                            },
                            new UserActivity
                            {
                                AppUser = users[1],
                                IsHost = false
                            },
                        }
                    },
                    new Activity
                    {
                        Title = "Future Activity 1",
                        Date = DateTime.Now.AddMonths(1),
                        Description = "Activity 1 month in future",
                        Category = "blood",
                        City = "London",
                        Venue = "Wembly Stadium",
                        Phone ="123456789",
                        Amount ="12345",
                        Attendees = new List<UserActivity>
                        {
                            new UserActivity
                            {
                                AppUser = users[2],
                                IsHost = true
                            },
                            new UserActivity
                            {
                                AppUser = users[1],
                                IsHost = false
                            },
                        }
                    },
                    new Activity
                    {
                        Title = "Future Activity 2",
                        Date = DateTime.Now.AddMonths(2),
                        Description = "Activity 2 months in future",
                        Category = "donations",
                        City = "London",
                        Venue = "Jamies Italian",
                        Phone ="123456789",
                        Amount ="12345",
                        Attendees = new List<UserActivity>
                        {
                            new UserActivity
                            {
                                AppUser = users[0],
                                IsHost = true
                            },
                            new UserActivity
                            {
                                AppUser = users[2],
                                IsHost = false
                            },
                        }
                    },
                    new Activity
                    {
                        Title = "Future Activity 3",
                        Date = DateTime.Now.AddMonths(3),
                        Description = "Activity 3 months in future",
                        Category = "blood",
                        City = "London",
                        Venue = "Pub",
                        Phone ="123456789",
                        Amount ="12345",
                        Attendees = new List<UserActivity>
                        {
                            new UserActivity
                            {
                                AppUser = users[1],
                                IsHost = true                            
                            },
                            new UserActivity
                            {
                                AppUser = users[0],
                                IsHost = false                            
                            },
                        }
                    },
                    new Activity
                    {
                        Title = "Future Activity 4",
                        Date = DateTime.Now.AddMonths(4),
                        Description = "Activity 4 months in future",
                        Category = "food",
                        City = "London",
                        Venue = "British Museum",
                        Phone ="123456789",
                        Amount ="12345",
                        Attendees = new List<UserActivity>
                        {
                            new UserActivity
                            {
                                AppUser = users[1],
                                IsHost = true                            
                            }
                        }
                    },
                    new Activity
                    {
                        Title = "Future Activity 5",
                        Date = DateTime.Now.AddMonths(5),
                        Description = "Activity 5 months in future",
                        Category = "food",
                        City = "London",
                        Venue = "Punch and Judy",
                        Phone ="123456789",
                        Amount ="12345",
                        Attendees = new List<UserActivity>
                        {
                            new UserActivity
                            {
                                AppUser = users[0],
                                IsHost = true                            
                            },
                            new UserActivity
                            {
                                AppUser = users[1],
                                IsHost = false                            
                            },
                        }
                    },
                    new Activity
                    {
                        Title = "Future Activity 6",
                        Date = DateTime.Now.AddMonths(6),
                        Description = "Activity 6 months in future",
                        Category = "blood",
                        City = "London",
                        Venue = "O2 Arena",
                        Phone ="123456789",
                        Amount ="12345",
                        Attendees = new List<UserActivity>
                        {
                            new UserActivity
                            {
                                AppUser = users[2],
                                IsHost = true                            
                            },
                            new UserActivity
                            {
                                AppUser = users[1],
                                IsHost = false                            
                            },
                        }
                    },
                    new Activity
                    {
                        Title = "Future Activity 7",
                        Date = DateTime.Now.AddMonths(7),
                        Description = "Activity 7 months in future",
                        Category = "clothing",
                        City = "Berlin",
                        Venue = "All",
                        Phone ="123456789",
                        Amount ="12345",
                        Attendees = new List<UserActivity>
                        {
                            new UserActivity
                            {
                                AppUser = users[0],
                                IsHost = true                            
                            },
                            new UserActivity
                            {
                                AppUser = users[2],
                                IsHost = false                            
                            },
                        }
                    },
                    new Activity
                    {
                        Title = "Future Activity 8",
                        Date = DateTime.Now.AddMonths(8),
                        Description = "Activity 8 months in future",
                        Category = "blood",
                        City = "London",
                        Venue = "Pub",
                        Phone ="123456789",
                        Amount ="12345",
                        Attendees = new List<UserActivity>
                        {
                            new UserActivity
                            {
                                AppUser = users[2],
                                IsHost = true                            
                            },
                            new UserActivity
                            {
                                AppUser = users[1],
                                IsHost = false                            
                            },
                        }
                    }
                };

                await context.Activities.AddRangeAsync(activities);
                await context.SaveChangesAsync();
            }
        }
    }
}
