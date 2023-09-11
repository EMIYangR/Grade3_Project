using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using YueBoAdmin.Models;

namespace YueBoAdmin.Controllers
{
    public class HotController : Controller
    {
        private YueBoDB db = new YueBoDB();
        // GET: Hot
        public ActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public ActionResult Index(string Tag)
        {
            Response.Write("<script>alert('设置成功！')</script>");
            return View();
        }
        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}