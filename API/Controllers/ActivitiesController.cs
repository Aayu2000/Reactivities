using Application.Activities.Commands;
using Application.Activities.DTOs;
using Application.Activities.Queries;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


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
        return HandleResult(await Mediator.Send(new GetActivityById.Query{Id = id}));
    }

    [HttpPost]
    public async Task<ActionResult<Guid>> CreateActivity(CreateActivityDto activityDto)
    {
        return HandleResult(await Mediator.Send(new CreateActivity.Command{ActivityDto = activityDto}));
    } 

    [HttpPut]
    public async Task<ActionResult> EditActivity(EditActivityDto activityDto)
    {
        return HandleResult(await Mediator.Send(new EditActivity.Command{ActivityDto = activityDto}));
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteActivity(Guid id)
    {
        return HandleResult(await Mediator.Send(new DeleteActivity.Command{Id = id}));
    }

}
