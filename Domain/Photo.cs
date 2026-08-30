using System.Text.Json.Serialization;

namespace Domain;

public class Photo
{
    public Guid Id { get; set; }
    public required string Url { get; set; }
    public required string PublicId { get; set; }

    //navigation properties --to perform cascade delete when a user is deleted so all the photos related to it is also deleted
    public required string UserId { get; set; }
    
    [JsonIgnore]
    public User User { get; set; } = null!;
}
