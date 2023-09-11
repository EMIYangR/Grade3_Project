using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using YueBoAdmin.Models;

namespace YueBoAdmin.Controllers
{
    public class HomeController : Controller
    {
        private YueBoDB db = new YueBoDB();
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Login()
        {
            return View();
        }
        [HttpPost]
        public ActionResult Login(string Account, string Pwd)
        {
            int res = db.Admin.Where(a => a.AdminAccount == Account).Where(a => a.AdminPwd == Pwd).Count();
            if (res > 0)
            {
                Response.Write("<script>alert('登录成功！')</script>");
                int id = db.Admin.FirstOrDefault(a => a.AdminAccount.Contains(Account)).AdminID;
                Response.Cookies["AdminID"].Value = id.ToString();
                return RedirectToAction("Index", "Home");
            }
            else
            {
                Response.Write("<script>alert('登录失败！');history.go(-1)</script>");
            }
            return View();
        }
        public ActionResult Developed()
        {
            return View();
        }
        public ActionResult Help()
        {
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