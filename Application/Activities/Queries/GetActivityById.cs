using System;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities.Queries;

public class GetActivityById
{
    public class Query : IRequest<Activity>
    {
        public required Guid Id { get; set; }
    }

    public class Handler(AppDbContext context) : IRequestHandler<Query, Activity>
    {
        public async Task<Activity> Handle(Query request, CancellationToken cancellationToken)
        {
            // return await context.Activities.ToListAsync(cancellationToken);
            var activity = await context.Activities.FindAsync([request.Id],cancellationToken);
            
            if(activity == null) throw new Exception("Activity Not Found");

            return activity;

        }
    }


}
