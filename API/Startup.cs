using System;
using System.Collections.Generic;
using System.Linq;
using Application.Activities;
using Application.Core;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.SignalR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using Persistance;
using FluentValidation.AspNetCore;
using API.Middleware;
using Domain;
using Microsoft.AspNetCore.Identity;
using API.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Authorization;
using Application.Interfaces;
using  Infrastructure.Security;
using Infrastructure.Photos;
using API.SignalR;
using System.Threading.Tasks;

namespace API
{
    public class Startup
    {
        public IConfiguration _config { get; }

        public Startup(IConfiguration config)
        {
            _config = config;

        }



        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
         
            services.AddControllers(opt => {
                var policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
                opt.Filters.Add(new AuthorizeFilter(policy));
            })
            
            
            
            .AddFluentValidation(_config =>{
               _config.RegisterValidatorsFromAssemblyContaining<Create>();
            });
         
         
            services.AddIdentityCore<AppUser>(opt=>
            {
                opt.Password.RequireNonAlphanumeric = false;
            }).AddEntityFrameworkStores<DataContext>()
            .AddSignInManager<SignInManager<AppUser>>();

         var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["TokenKey"]));
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(opt =>{
                opt.TokenValidationParameters = new TokenValidationParameters{

                            ValidateIssuerSigningKey=true,
                            IssuerSigningKey = key,
                            ValidateIssuer = false,
                            ValidateAudience = false 
            };
            opt.Events = new JwtBearerEvents 
            {
                OnMessageReceived = context =>
                {
                    var accessToken = context.Request.Query["access_token"];
                    var path = context.HttpContext.Request.Path;
                    if(!string.IsNullOrEmpty(accessToken) && (path.StartsWithSegments("/chat"))){
                        context.Token = accessToken;
                    }
                    return Task.CompletedTask;
                }
            };
            } );

            services.AddAuthorization(opt=>{
                opt.AddPolicy("IsActivityHost", policy =>{
                        policy.Requirements.Add(new IsHostRequirement());
                    });
            });
            services.AddTransient<IAuthorizationHandler , IsHostRequirementHandler>();
            services.AddScoped<TokenService>();
           
           
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "API", Version = "v1" });
            });
           
           
            services.AddDbContext<DataContext>(opt =>
            {

                opt.UseSqlite(_config.GetConnectionString("DefaultConnection"));
            });

           
            services.AddCors( opt => 
            {
                opt.AddPolicy("CorsPolicy", policy =>
                {
                    policy.AllowAnyMethod().AllowAnyHeader().AllowCredentials().WithOrigins("http://localhost:3000");
                });
            });

           
            services.AddMediatR(typeof(List.Handler).Assembly);
            services.AddAutoMapper(typeof(MappingProfile).Assembly);
            services.AddScoped<IUserAccessor , UserAccessor>();
            services.AddScoped<IPhotoAccessor , PhotoAccessor>();
            services.Configure<CloudinarySettings>(_config.GetSection("Cloudinary"));
            services.AddSignalR();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {

            app.UseMiddleware<ExceptionMiddleware>();
            if (env.IsDevelopment())
            {
               
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "API v1"));
            }

            // app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors("CorsPolicy");

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapHub<ChatHub>("/chat");
            });
        }   
    }
}
