namespace CustomCables.Models
{
    public enum SignalType
    {
        LPos,
        LNeg,
        RPos,
        RNeg,
        GND,
        MIC,
        Shield
    }
    public struct Wire // TODO figure out if this should be a class or a struct, also if these are all the fields needed
    {
        public int Id {get; set;}
        public string Color {get; set;}
        public string Gauge {get; set;}
        public string Material {get; set;}
        public SignalType Signal {get; set;}
    }
    
    public class CableSegment(int id, Wire[] wires, string braidStyle, int lengthFt, int paracordSize)
    {
        public int Id {get; set;} = id;
        public Wire[] Wires {get; set;} = wires;
        public string BraidStyle {get; set;} = braidStyle;
        public int LengthFt {get; set;} = lengthFt;
        public int ParacordSize {get; set;} = paracordSize; // TODO: check with Adrian what data type this has to be
    }
}