namespace CustomCables.Models
{
    public class CableConfiguration(int id, string firstName, string lastName, string email, CableConnector[] sources, CableConnector[] outputs)
    {
        public int Id {get; set;} = id;
        public string CustomerFirst {get; set;} = firstName;
        public string CustomerLast {get; set;} = lastName;
        public string CustomerEmail {get; set;} = email;
    }
}