namespace CustomCables.Models
{
    public enum ConnectorType
    {
        Mm2_5,
        Mm3_5,
        Mm4_4,
        Mm6_35,
        XLR,
        MiniXLR,
        RCA
    }
    public enum WiringType
    {
        RcaWire,
        Unbalanced,
        Balanced,
        StereoMicCombo
    }
    public enum Gender
    {
        Male,
        Female
    }
    public class CableConnector(int id, ConnectorType jack, WiringType wiring, Gender gender, int contactCount)
    {
        public int Id { get; set; } = id;
        public ConnectorType JackType { get; set; } = jack;
        public WiringType Wiring {get; set;} = wiring;
        public Gender Gender { get; set; } = gender;
        public int ContactCount { get; set; } = contactCount;

        public bool IsMale()
        {
            return this.Gender == Gender.Male;
        }
        public bool IsFemale()
        {
            return this.Gender == Gender.Female;
        }
    }
}