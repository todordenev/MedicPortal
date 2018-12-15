namespace MedicPortal.Helpers
{
    public static class ObjectExt
    {
        public static string GetStringProperty(this object thisObject, string propertyName)
        {
            if (thisObject == null)
                return null;
            var objectType = thisObject.GetType();
            var propertie = objectType.GetProperty(propertyName);
            if (propertie == null)
            {
                return null;
            }

            return propertie.GetValue(thisObject) as string;
        }
    }
}