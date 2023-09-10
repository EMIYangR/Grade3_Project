using PagedList;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using YueBoAdmin.Models;

namespace YueBoAdmin.Controllers
{
    public class UserInfoesController : Controller
    {
        private YueBoDB db = new YueBoDB();

        // GET: UserInfoes
        public ActionResult Index(int page = 1)
        {
            var ui = db.UserInfo.Include(l => l.UserTypeDetail).OrderBy(l => l.UserAccount);
            //.Include(UserTypeDetail.UserType);
            return View(ui.OrderBy(a => a.UserID).ToPagedList(page, 10));
        }
        [HttpPost]
        public ActionResult Index(string reportname, int page = 1)
        {
            var temp = db.UserInfo.OrderBy(l => l.UserAccount).Include(l => l.UserTypeDetail)
                .Where(a => a.UserAccount.Contains(reportname)).ToList();
            return View(temp.ToPagedList(page, 10));
        }
        // GET: UserInfoes/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            UserInfo userInfo = db.UserInfo.Find(id);
            if (userInfo == null)
            {
                return HttpNotFound();
            }
            return View(userInfo);
        }

        // GET: UserInfoes/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: UserInfoes/Create
        // 为了防止“过多发布”攻击，请启用要绑定到的特定属性。有关
        // 详细信息，请参阅 https://go.microsoft.com/fwlink/?LinkId=317598。
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "UserID,UserName,UserNick,UserAccount,Signature,UserPwd,UserPic,Phone,Email,IDcard,Sex,Birthday,RegisterTime,CreditScore,IsBan")] UserInfo userInfo)
        {
            if (ModelState.IsValid)
            {
                db.UserInfo.Add(userInfo);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(userInfo);
        }

        // GET: UserInfoes/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            UserInfo userInfo = db.UserInfo.Find(id);
            if (userInfo == null)
            {
                return HttpNotFound();
            }
            return View(userInfo);
        }

        // POST: UserInfoes/Edit/5
        // 为了防止“过多发布”攻击，请启用要绑定到的特定属性。有关
        // 详细信息，请参阅 https://go.microsoft.com/fwlink/?LinkId=317598。
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "UserID,UserName,UserNick,UserAccount,Signature,UserPwd,UserPic,Phone,Email,IDcard,Sex,Birthday,RegisterTime,CreditScore,IsBan")] UserInfo userInfo)
        {
            if (ModelState.IsValid)
            {
                db.Entry(userInfo).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(userInfo);
        }
        public ActionResult ResetPwd(int id)
        {
            int Aid = int.Parse(Request.Cookies["AdminID"].Value);
            AdminControl ac = new AdminControl();
            ac.AdminContent = "重置了用户密码";
            ac.PostID = null;
            ac.ReportID = null;
            ac.UserID = id;
            ac.RecordTime = DateTime.Now;
            ac.AdminID = Aid;
            db.AdminControl.Add(ac);
            db.UserInfo.Find(id).UserPwd = "123456";
            try
            {
                db.SaveChanges();
            }
            catch (Exception)
            {
                throw;
            }
            return RedirectToAction("Index");
        }
        public ActionResult Ban(int page = 1)
        {
            var BanUser = db.UserInfo.Include(l => l.UserTypeDetail).Where(l => l.IsBan == true).ToList();
            return View(BanUser.ToPagedList(page, 10));
        }
        [HttpPost]
        public ActionResult Ban(string reportname, int page = 1)
        {
            var temp = db.UserInfo.Include(l => l.UserTypeDetail).Where(l => l.IsBan == true)
                .Where(a => a.UserAccount.Contains(reportname)).ToList();
            return View(temp.ToPagedList(page, 10));
        }
        //封禁用户
        public ActionResult BanUser(int id)
        {
            int Aid = int.Parse(Request.Cookies["AdminID"].Value);
            AdminControl ac = new AdminControl();
            ac.AdminContent = "封禁了用户";
            ac.PostID = null;
            ac.ReportID = null;
            ac.UserID = id;
            ac.RecordTime = DateTime.Now;
            ac.AdminID = Aid;
            db.AdminControl.Add(ac);
            db.UserInfo.Find(id).IsBan = true;
            db.UserInfo.Find(id).CreditScore -= 20;
            try
            {
                db.SaveChanges();
            }
            catch (Exception)
            {
                throw;
            }
            return RedirectToAction("Index");
        }
        //解封用户
        public ActionResult Restore(int? id)
        {
            int Aid = int.Parse(Request.Cookies["AdminID"].Value);
            AdminControl ac = new AdminControl();
            ac.AdminContent = "解封了用户";
            ac.PostID = null;
            ac.ReportID = null;
            ac.UserID = id;
            ac.RecordTime = DateTime.Now;
            ac.AdminID = Aid;
            db.AdminControl.Add(ac);
            db.UserInfo.Find(id).IsBan = false;
            db.UserInfo.Find(id).CreditScore += 20;
            try
            {
                db.SaveChanges();
            }
            catch (Exception)
            {
                throw;
            }
            return RedirectToAction("Ban");
        }
        //注销账户
        // GET: UserInfoes/Delete/5
        public ActionResult DeleteConfirmed(int id)
        {
            int Aid = int.Parse(Request.Cookies["AdminID"].Value);
            AdminControl ac = new AdminControl();
            ac.AdminContent = "注销了用户";
            ac.PostID = null;
            ac.ReportID = null;
            ac.UserID = id;
            ac.RecordTime = DateTime.Now;
            ac.AdminID = Aid;
            db.AdminControl.Add(ac);
            UserInfo userInfo = db.UserInfo.Find(id);
            db.UserInfo.Remove(userInfo);
            db.SaveChanges();
            return RedirectToAction("Index");
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
