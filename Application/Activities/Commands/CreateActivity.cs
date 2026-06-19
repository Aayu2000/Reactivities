using Application.Activities.DTOs;
using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Activities.Commands;

public class CreateActivity
{
    public class Command : IRequest<Result<Guid>>
    {
        public required CreateActivityDto ActivityDto { get; set; }
    }

    public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Command, Result<Guid>>
    {
        public async Task<Result<Guid>> Handle(Command request, CancellationToken cancellationToken)
        {
           

            var activity = mapper.Map<Activity>(request.ActivityDto);

            await context.Activities.AddAsync(activity);

          var result = await context.SaveChangesAsync(cancellationToken) > 0;

            if(!result)
            {
                return Result<Guid>.Failure("Failed to create activity", 400);
            }

            return Result<Guid>.Success(activity.Id);
        }
    }
}
