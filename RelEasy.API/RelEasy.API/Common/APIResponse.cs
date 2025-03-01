﻿namespace RelEasy.API.Common
{
    public class APIResponse<T>
    {
        public bool IsSuccess { get; set; }
        public string? Message { get; set; }
        public T? Data { get; set; }
    }
}
