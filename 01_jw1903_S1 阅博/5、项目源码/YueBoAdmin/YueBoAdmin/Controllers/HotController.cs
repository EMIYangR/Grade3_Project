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
            //return RedirectToAction("Index");
            //int res = db.Admin.Where(a => a.AdminAccount == Account).Where(a => a.AdminPwd == Pwd).Count();
            //if (res > 0)
            //{
            //    Response.Write("<script>alert('登录成功！')</script>");
            //    int id = db.Admin.FirstOrDefault(a => a.AdminAccount.Contains(Account)).AdminID;
            //    Response.Cookies["AdminID"].Value = id.ToString();
            //    return RedirectToAction("Index");
            //}
            //else
            //{
            //    Response.Write("<script>alert('登录失败！');history.go(-1)</script>");
            //}
            //return View();
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