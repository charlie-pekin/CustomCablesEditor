using System.Text.Json;

namespace CustomCables.Models
{
    public struct CableJunction // put in EndSegment instead
    {
        public int Id {get; set;}
        public string Name {get; set;}
        public string Description {get; set;}
    }
    public class EndSegment : CableSegment
    {
        public CableConnector Connector {get; set;}
        public string HeatshrinkColor {get; set;}
        public CableJunction Junction {get; set;} // add logic for Junction to match on cables with multiple end segments per side
        public EndSegment(int id, int wireCount, Wire[] wires, string braidStyle, int lengthFt, int paracordSize, CableConnector connector, string heatshrinkColor, CableJunction junction) 
            : base(id, wires, braidStyle, lengthFt, paracordSize)
        {
            // Additional initialization logic for EndSegment
            Connector = connector;
            HeatshrinkColor = heatshrinkColor;
        }
        public override string ToString() => JsonSerializer.Serialize<EndSegment>(this); // returns JSON representation of this segment
        
    }
}