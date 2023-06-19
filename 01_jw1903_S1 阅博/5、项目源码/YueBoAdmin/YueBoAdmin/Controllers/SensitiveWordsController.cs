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
    public class SensitiveWordsController : Controller
    {
        private YueBoDB db = new YueBoDB();

        // GET: SensitiveWords
        public ActionResult Index(int page = 1)
        {
            //byte[] bytes = db.SensitiveWord.Select(a => new { a.SensitiveContent }).ToList();
            ////byte[] bytes = System.Convert.FromBase64String(str);
            //string str = System.Text.Encoding.UTF8.GetString(bytes);

            return View(db.SensitiveWord.OrderBy(a => a.SensitiveWordID).ToPagedList(page, 15));

        }

        // GET: SensitiveWords/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            SensitiveWord sensitiveWord = db.SensitiveWord.Find(id);
            if (sensitiveWord == null)
            {
                return HttpNotFound();
            }
            return View(sensitiveWord);
        }

        // GET: SensitiveWords/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: SensitiveWords/Create
        // 为了防止“过多发布”攻击，请启用要绑定到的特定属性。有关
        // 详细信息，请参阅 https://go.microsoft.com/fwlink/?LinkId=317598。
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "SensitiveWordID,SensitiveContent,DeductionPoint")] SensitiveWord sensitiveWord)
        {
            //byte[] bytes = System.Text.Encoding.UTF8.GetBytes(sensitiveWord.SensitiveContent);
            //base64 = System.Convert.ToBase64String(bytes);


            if (ModelState.IsValid)
            {
                db.SensitiveWord.Add(sensitiveWord);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(sensitiveWord);
        }

        // GET: SensitiveWords/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            SensitiveWord sensitiveWord = db.SensitiveWord.Find(id);
            if (sensitiveWord == null)
            {
                return HttpNotFound();
            }
            return View(sensitiveWord);
        }

        // POST: SensitiveWords/Edit/5
        // 为了防止“过多发布”攻击，请启用要绑定到的特定属性。有关
        // 详细信息，请参阅 https://go.microsoft.com/fwlink/?LinkId=317598。
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "SensitiveWordID,SensitiveContent,DeductionPoint")] SensitiveWord sensitiveWord)
        {
            if (ModelState.IsValid)
            {
                db.Entry(sensitiveWord).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(sensitiveWord);
        }

        // GET: SensitiveWords/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            SensitiveWord sensitiveWord = db.SensitiveWord.Find(id);
            if (sensitiveWord == null)
            {
                return HttpNotFound();
            }
            return View(sensitiveWord);
        }

        // POST: SensitiveWords/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            SensitiveWord sensitiveWord = db.SensitiveWord.Find(id);
            db.SensitiveWord.Remove(sensitiveWord);
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
