using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistance;
using MediatR;
using Application.Activities;
using Microsoft.AspNetCore.Authorization;
using Application.Core;

namespace API.Controllers
{

    
    public class ActivitiesController : BaseApiController
    {
      
        [HttpGet]

        public async Task<IActionResult> GetActivites([FromQuery]ActivityParams param )
        {

            return HandlePagedResult(await Mediator.Send(new List.Query{Params = param}));


        }
        
        [HttpGet("{id}")]

        public async Task<IActionResult> GetActivity(Guid id)
        {
            var result = await Mediator.Send(new Details.Query{Id = id});

               return HandleResult(result);
        }

        [HttpPost]

        public async Task<IActionResult> CreateActivity (Activity activity){
            return HandleResult(await Mediator.Send(new Create.Command {Activity = activity}));
        }
        [HttpPut("{id}")]

        [Authorize(Policy = "IsActivityHost")]
        public async Task<IActionResult> EditActivity (Activity activity, Guid id){
            activity.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command{Activity = activity}));
        }

        [Authorize(Policy = "IsActivityHost")]
        [HttpDelete("{id}")]

        public async Task<IActionResult> DeleteActivity(Guid id){

            return HandleResult(await Mediator.Send(new Delete.Command{Id = id}));

        }

        [HttpPost("{id}/attend")]
        public async Task<IActionResult> Attend(Guid id){
             return HandleResult(await Mediator.Send(new UpdateAttendance.Command{Id = id}));
        }


    }
}