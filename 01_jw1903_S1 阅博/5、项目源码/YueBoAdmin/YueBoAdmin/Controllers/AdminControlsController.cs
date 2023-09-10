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
    public class AdminControlsController : Controller
    {
        private YueBoDB db = new YueBoDB();

        // GET: AdminControls
        public ActionResult Index(int page = 1)
        {
            var adminControl = db.AdminControl.OrderByDescending(a=>a.RecordTime).Include(a => a.Admin);
            return View(adminControl.OrderBy(a => a.AdminControlID).ToPagedList(page, 10));
        }

        // GET: AdminControls/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            AdminControl adminControl = db.AdminControl.Find(id);
            if (adminControl == null)
            {
                return HttpNotFound();
            }
            return View(adminControl);
        }

        // GET: AdminControls/Create
        public ActionResult Create()
        {
            ViewBag.AdminID = new SelectList(db.Admin, "AdminID", "AdminNumber");
            return View();
        }

        // POST: AdminControls/Create
        // 为了防止“过多发布”攻击，请启用要绑定到的特定属性。有关
        // 详细信息，请参阅 https://go.microsoft.com/fwlink/?LinkId=317598。
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "AdminControlID,AdminID,AdminContent")] AdminControl adminControl)
        {
            if (ModelState.IsValid)
            {
                db.AdminControl.Add(adminControl);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            ViewBag.AdminID = new SelectList(db.Admin, "AdminID", "AdminNumber", adminControl.AdminID);
            return View(adminControl);
        }

        // GET: AdminControls/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            AdminControl adminControl = db.AdminControl.Find(id);
            if (adminControl == null)
            {
                return HttpNotFound();
            }
            ViewBag.AdminID = new SelectList(db.Admin, "AdminID", "AdminNumber", adminControl.AdminID);
            return View(adminControl);
        }

        // POST: AdminControls/Edit/5
        // 为了防止“过多发布”攻击，请启用要绑定到的特定属性。有关
        // 详细信息，请参阅 https://go.microsoft.com/fwlink/?LinkId=317598。
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "AdminControlID,AdminID,AdminContent")] AdminControl adminControl)
        {
            if (ModelState.IsValid)
            {
                db.Entry(adminControl).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.AdminID = new SelectList(db.Admin, "AdminID", "AdminNumber", adminControl.AdminID);
            return View(adminControl);
        }

        // GET: AdminControls/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            AdminControl adminControl = db.AdminControl.Find(id);
            if (adminControl == null)
            {
                return HttpNotFound();
            }
            return View(adminControl);
        }

        // POST: AdminControls/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            AdminControl adminControl = db.AdminControl.Find(id);
            db.AdminControl.Remove(adminControl);
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
