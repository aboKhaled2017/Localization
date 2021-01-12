using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Localization.Models;
using Microsoft.Extensions.Localization;
using Microsoft.AspNetCore.Localization;
using System.Globalization;
using Microsoft.AspNetCore.Http;

namespace Localization.Controllers
{
    public class HomeController : Controller
    {
        private readonly IStringLocalizer stringLocalizer;
        public HomeController(IStringLocalizerFactory factory)
        {
            stringLocalizer = factory.Create("Controllers.Home",
                System.Reflection.Assembly.GetExecutingAssembly().GetName().Name);
        }
        public IActionResult SelectLang(string culture, string returnUrl)
        {
            Response.Cookies.Append(
                CookieRequestCultureProvider.DefaultCookieName,
                CookieRequestCultureProvider.MakeCookieValue(new RequestCulture(culture)),
                new CookieOptions
                {
                  Expires=DateTimeOffset.Now.AddDays(5)
                });
            return LocalRedirect(returnUrl);
        }
        public IActionResult Index()
        {
            var welcom = stringLocalizer.GetString("welcom");
            var w = stringLocalizer["welcom"];
            return View();
        }
        [HttpPost]
        public IActionResult Register(RegisterViewModel model)
        {
            if (!ModelState.IsValid)
                return View();
            else return Redirect("/home/index");
        }
        public IActionResult Register()
        {
            return View();
        }
        public IActionResult Privacy()
        {
            
            return View();
        }


        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
