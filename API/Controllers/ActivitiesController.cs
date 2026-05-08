using Application.Activities.Commands;
using Application.Activities.Queries;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.Differencing;

namespace API.Controllers;

public class ActivitiesController : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<List<Activity>>> GetActivities()
    {
        return await Mediator.Send(new GetActivityList.Query());
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Activity>> GetActivityById(Guid id)
    {
        // var activity = await context.Activities.FindAsync(id);
        // if(activity == null) return NotFound();
        // return activity;
        return await Mediator.Send(new GetActivityById.Query{Id = id});
    }

    [HttpPost]
    public async Task<ActionResult<Guid>> CreateActivity(Activity activity)
    {
        return await Mediator.Send(new CreateActivity.Command{Activity = activity});
    } 

    [HttpPut]
    public async Task<ActionResult> EditActivity(Activity activity)
    {
        await Mediator.Send(new EditActivity.Command{Activity = activity});
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteActivity(Guid id)
    {
        await Mediator.Send(new DeleteActivity.Command{Id = id});
        return Ok();
    }

}
