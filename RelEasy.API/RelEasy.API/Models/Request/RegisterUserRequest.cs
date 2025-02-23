namespace RelEasy.API.Models.Request
{
    public class RegisterUserRequest
    {
        public string UserEmail { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string DisplayName { get; set; }
    }
}
