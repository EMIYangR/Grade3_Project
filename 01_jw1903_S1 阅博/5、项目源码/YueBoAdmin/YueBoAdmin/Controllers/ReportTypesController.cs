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
    public class ReportTypesController : Controller
    {
        private YueBoDB db = new YueBoDB();

        // GET: ReportTypes
        public ActionResult Index()
        {
            return View(db.ReportType.ToList());
        }

        // GET: ReportTypes/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            ReportType reportType = db.ReportType.Find(id);
            if (reportType == null)
            {
                return HttpNotFound();
            }
            return View(reportType);
        }

        // GET: ReportTypes/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: ReportTypes/Create
        // 为了防止“过多发布”攻击，请启用要绑定到的特定属性。有关
        // 详细信息，请参阅 https://go.microsoft.com/fwlink/?LinkId=317598。
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "ReportTypeID,ReportTypeName")] ReportType reportType)
        {
            if (ModelState.IsValid)
            {
                db.ReportType.Add(reportType);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(reportType);
        }

        // GET: ReportTypes/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            ReportType reportType = db.ReportType.Find(id);
            if (reportType == null)
            {
                return HttpNotFound();
            }
            return View(reportType);
        }

        // POST: ReportTypes/Edit/5
        // 为了防止“过多发布”攻击，请启用要绑定到的特定属性。有关
        // 详细信息，请参阅 https://go.microsoft.com/fwlink/?LinkId=317598。
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "ReportTypeID,ReportTypeName")] ReportType reportType)
        {
            if (ModelState.IsValid)
            {
                db.Entry(reportType).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(reportType);
        }

        // GET: ReportTypes/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            ReportType reportType = db.ReportType.Find(id);
            if (reportType == null)
            {
                return HttpNotFound();
            }
            return View(reportType);
        }

        // POST: ReportTypes/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            ReportType reportType = db.ReportType.Find(id);
            db.ReportType.Remove(reportType);
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
