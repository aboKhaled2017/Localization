using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Localization
{
    public static class RazorExtensions
    {
        public static string[] Months(this IHtmlHelper HTML)=>
            new string[]
                {
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December"
                };
        public static string[] YearsFromNow(this IHtmlHelper HTML,int yearsCount=20)
        {
            var years = new string[yearsCount];
            for (int i = 0; i < yearsCount; i++)
            {
                years[i]=DateTime.Now.AddYears(i).Year.ToString();
            }
            return years;
        }
    }
}
