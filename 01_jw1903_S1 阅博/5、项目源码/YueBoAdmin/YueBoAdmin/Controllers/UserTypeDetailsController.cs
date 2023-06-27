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
    public class UserTypeDetailsController : Controller
    {
        private YueBoDB db = new YueBoDB();

        // GET: UserTypeDetails
        public ActionResult Index(int page = 1)
        {
            var userTypeDetail = db.UserTypeDetail
                .OrderBy(u => u.IsAuthentication).Include(u => u.UserInfo).Include(u => u.UserType);
            return View(userTypeDetail.ToPagedList(page, 10));
        }
        [HttpPost]
        public ActionResult Index(string reportname, int page = 1)
        {
            var userTypeDetail = db.UserTypeDetail.OrderBy(u => u.IsAuthentication).Include(u => u.UserInfo).Include(u => u.UserType)
                .Where(u => u.UserInfo.UserAccount.Contains(reportname));
            return View(userTypeDetail.ToPagedList(page, 10));
        }
        public ActionResult Authentication(int? id)
        {
            db.UserTypeDetail.Find(id).IsAuthentication = true;
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        // GET: UserTypeDetails/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            UserTypeDetail userTypeDetail = db.UserTypeDetail.Find(id);
            if (userTypeDetail == null)
            {
                return HttpNotFound();
            }
            return View(userTypeDetail);
        }

        // GET: UserTypeDetails/Create
        public ActionResult Create()
        {
            ViewBag.UserID = new SelectList(db.UserInfo, "UserID", "UserName");
            ViewBag.UserTypeID = new SelectList(db.UserType, "UserTypeID", "UserTypeName");
            return View();
        }

        // POST: UserTypeDetails/Create
        // 为了防止“过多发布”攻击，请启用要绑定到的特定属性。有关
        // 详细信息，请参阅 https://go.microsoft.com/fwlink/?LinkId=317598。
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "UserTypeDetailID,UserID,UserTypeID,ReviewPic,IsAuthentication")] UserTypeDetail userTypeDetail)
        {
            if (ModelState.IsValid)
            {
                db.UserTypeDetail.Add(userTypeDetail);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            ViewBag.UserID = new SelectList(db.UserInfo, "UserID", "UserName", userTypeDetail.UserID);
            ViewBag.UserTypeID = new SelectList(db.UserType, "UserTypeID", "UserTypeName", userTypeDetail.UserTypeID);
            return View(userTypeDetail);
        }

        // GET: UserTypeDetails/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            UserTypeDetail userTypeDetail = db.UserTypeDetail.Find(id);
            if (userTypeDetail == null)
            {
                return HttpNotFound();
            }
            ViewBag.UserID = new SelectList(db.UserInfo, "UserID", "UserName", userTypeDetail.UserID);
            ViewBag.UserTypeID = new SelectList(db.UserType, "UserTypeID", "UserTypeName", userTypeDetail.UserTypeID);
            return View(userTypeDetail);
        }

        // POST: UserTypeDetails/Edit/5
        // 为了防止“过多发布”攻击，请启用要绑定到的特定属性。有关
        // 详细信息，请参阅 https://go.microsoft.com/fwlink/?LinkId=317598。
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "UserTypeDetailID,UserID,UserTypeID,ReviewPic,IsAuthentication")] UserTypeDetail userTypeDetail)
        {
            if (ModelState.IsValid)
            {
                db.Entry(userTypeDetail).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.UserID = new SelectList(db.UserInfo, "UserID", "UserName", userTypeDetail.UserID);
            ViewBag.UserTypeID = new SelectList(db.UserType, "UserTypeID", "UserTypeName", userTypeDetail.UserTypeID);
            return View(userTypeDetail);
        }

        // GET: UserTypeDetails/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            UserTypeDetail userTypeDetail = db.UserTypeDetail.Find(id);
            if (userTypeDetail == null)
            {
                return HttpNotFound();
            }
            return View(userTypeDetail);
        }

        // POST: UserTypeDetails/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            UserTypeDetail userTypeDetail = db.UserTypeDetail.Find(id);
            db.UserTypeDetail.Remove(userTypeDetail);
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
