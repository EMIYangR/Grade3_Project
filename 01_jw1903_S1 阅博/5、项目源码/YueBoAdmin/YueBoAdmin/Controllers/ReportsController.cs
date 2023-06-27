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
    public class ReportsController : Controller
    {
        private YueBoDB db = new YueBoDB();

        // GET: Reports
        public ActionResult Index(int page = 1)
        {
            var report = db.Report.OrderByDescending(a => a.ReportTime)
                .Include(r => r.Post).Include(r => r.ReportType).Include(r => r.UserInfo)
                .Where(r => r.IsSeccess == false).ToList();
            return View(report.ToPagedList(page, 10));
        }
        public ActionResult Index2(int page = 1)
        {
            var report = db.Report.OrderByDescending(a => a.ReportTime).Include(r => r.Post)
                .Include(r => r.ReportType).Include(r => r.UserInfo)
                .Where(r => r.IsSeccess == true).ToList();
            return View(report.ToPagedList(page, 10));
        }
        //删除评论
        public ActionResult DeleteReport(int? id)
        {
            int Aid = int.Parse(Request.Cookies["AdminID"].Value);
            AdminControl ac = new AdminControl();
            ac.AdminContent = "删除了评论";
            ac.PostID = null;
            ac.ReportID = id;
            ac.UserID = null;
            ac.RecordTime = DateTime.Now;
            ac.AdminID = Aid;
            db.AdminControl.Add(ac);
            db.Report.Find(id).IsSeccess = true;
            var PostID = db.Report.Find(id).PostID;
            db.Post.Find(PostID).IsBan = true;
            db.UserInfo.Find(id).CreditScore -= 10;
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
        //恢复评论
        public ActionResult Restore(int? id)
        {
            int Aid = int.Parse(Request.Cookies["AdminID"].Value);
            AdminControl ac = new AdminControl();
            ac.AdminContent = "恢复了评论";
            ac.PostID = null;
            ac.ReportID = id;
            ac.UserID = null;
            ac.RecordTime = DateTime.Now;
            ac.AdminID = Aid;
            db.AdminControl.Add(ac);
            var PostID = db.Report.Find(id).PostID;
            db.Post.Find(PostID).IsBan = false;
            db.UserInfo.Find(id).CreditScore += 10;
            try
            {
                db.SaveChanges();
            }
            catch (Exception)
            {
                throw;
            }
            return RedirectToAction("Index2");
        }
        [HttpPost]
        public ActionResult Index(string reportname, int page = 1)
        {
            var temp = db.Report.Include(r => r.Post).Include(r => r.ReportType).Include(r => r.UserInfo)
                .Where(a => a.UserInfo.UserAccount.Contains(reportname)).Where(a => a.IsSeccess == false).ToList();
            return View(temp.ToPagedList(page, 10));
        }
        [HttpPost]
        public ActionResult Index2(string reportname, int page = 1)
        {
            var temp = db.Report.Include(r => r.Post).Include(r => r.ReportType).Include(r => r.UserInfo)
                .Where(a => a.UserInfo.UserAccount.Contains(reportname)).Where(a => a.IsSeccess == true).ToList();
            return View(temp.ToPagedList(page, 10));
        }

        // GET: Reports/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Report report = db.Report.Find(id);
            if (report == null)
            {
                return HttpNotFound();
            }
            return View(report);
        }

        // GET: Reports/Create
        public ActionResult Create()
        {
            ViewBag.PostID = new SelectList(db.Post, "PostID", "PostPic");
            ViewBag.ReportTypeID = new SelectList(db.ReportType, "ReportTypeID", "ReportTypeName");
            ViewBag.UserID = new SelectList(db.UserInfo, "UserID", "UserName");
            return View();
        }

        // POST: Reports/Create
        // 为了防止“过多发布”攻击，请启用要绑定到的特定属性。有关
        // 详细信息，请参阅 https://go.microsoft.com/fwlink/?LinkId=317598。
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "ReportID,UserID,PostID,ReportTypeID,Reason,IsSeccess")] Report report)
        {
            if (ModelState.IsValid)
            {
                db.Report.Add(report);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            ViewBag.PostID = new SelectList(db.Post, "PostID", "PostPic", report.PostID);
            ViewBag.ReportTypeID = new SelectList(db.ReportType, "ReportTypeID", "ReportTypeName", report.ReportTypeID);
            ViewBag.UserID = new SelectList(db.UserInfo, "UserID", "UserName", report.UserID);
            return View(report);
        }

        // GET: Reports/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Report report = db.Report.Find(id);
            if (report == null)
            {
                return HttpNotFound();
            }
            ViewBag.PostID = new SelectList(db.Post, "PostID", "PostPic", report.PostID);
            ViewBag.ReportTypeID = new SelectList(db.ReportType, "ReportTypeID", "ReportTypeName", report.ReportTypeID);
            ViewBag.UserID = new SelectList(db.UserInfo, "UserID", "UserName", report.UserID);
            return View(report);
        }

        // POST: Reports/Edit/5
        // 为了防止“过多发布”攻击，请启用要绑定到的特定属性。有关
        // 详细信息，请参阅 https://go.microsoft.com/fwlink/?LinkId=317598。
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "ReportID,UserID,PostID,ReportTypeID,Reason,IsSeccess")] Report report)
        {
            if (ModelState.IsValid)
            {
                db.Entry(report).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.PostID = new SelectList(db.Post, "PostID", "PostPic", report.PostID);
            ViewBag.ReportTypeID = new SelectList(db.ReportType, "ReportTypeID", "ReportTypeName", report.ReportTypeID);
            ViewBag.UserID = new SelectList(db.UserInfo, "UserID", "UserName", report.UserID);
            return View(report);
        }

        // GET: Reports/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Report report = db.Report.Find(id);
            if (report == null)
            {
                return HttpNotFound();
            }
            return View(report);
        }

        // POST: Reports/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            Report report = db.Report.Find(id);
            db.Report.Remove(report);
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
