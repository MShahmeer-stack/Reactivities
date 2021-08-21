using Application.Profiles;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
namespace API.Controllers
{
    public class ProfilesController : BaseApiController
    {
        [HttpGet("{userName}")]

        public async Task<ActionResult> GetProfile(string userName)
        {
                    return HandleResult(await Mediator.Send(new Details.Query{UserName = userName}));
        }
        
    }
}