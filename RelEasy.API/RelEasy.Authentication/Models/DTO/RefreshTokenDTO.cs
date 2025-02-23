namespace RelEasy.Authentication.Models.DTO
{
    public class RefreshTokenDTO
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Token { get; set; }
        public DateTime Expires { get; set; }
        public string JWTTokenId { get; set; }
        public bool IsDeleted { get; set; }
    }
}