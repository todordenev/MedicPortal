using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MedicPortal.Helpers
{
    public static class StringExt
    {
        public static bool IsNullOrEmpty(this string value)
        {
            return string.IsNullOrWhiteSpace(value);
        }
    }
}
