using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MedicPortal.Helpers
{
    public static class DataTimeExt
    {
        public static bool IsBetween(this DateTime time, DateTime start, DateTime end)
        {
            return start <= time && time <= end;
        }
    }
}
