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
                .Include(r => r.Post).Include(r => r.ReportType).Include(r => r.UserInfo).ToList();
            return View(report.ToPagedList(page, 10));
        }
        public ActionResult Index2(int page = 1)
        {
            var report = db.Report.OrderByDescending(a => a.ReportTime).Include(r => r.Post).Include(r => r.ReportType).Include(r => r.UserInfo).ToList();
            return View(report.ToPagedList(page, 10));
        }
        public ActionResult DeleteReport(int id)
        {
            db.Report.Find(id).IsSeccess = true;
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
        [HttpPost]
        public ActionResult Index(string reportname)
        {
            var temp = db.Report.Include(r => r.Post).Include(r => r.ReportType).Include(r => r.UserInfo);
            return View(temp.Where(a => a.UserInfo.UserAccount.Contains(reportname)));

            //string sql = "SELECT rt.ReportTypeName,u.UserNick,u.UserAccount,p.PostPic,p.PostVideo,p.PostContent,r.Reason,r.IsSeccess,r.ReportTime " +
            //    "FROM Report r JOIN UserInfo u on r.UserID = u.UserID JOIN ReportType rt ON r.ReportTypeID = rt.ReportTypeID JOIN Post p ON r.PostID = p.PostID  " +
            //    "WHERE UserAccount LIKE '%" + reportname + "%'";
            //ViewBag.EmpList = db.Database.SqlQuery(typeof(), sql);
            //ViewBag.DeptList = db.Report;
            //return View();
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
