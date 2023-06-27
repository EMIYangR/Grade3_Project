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
    public class PostsController : Controller
    {
        private YueBoDB db = new YueBoDB();

        // GET: Posts
        public ActionResult Index(int page = 1)
        {
            var post = db.Post.OrderByDescending(p => p.PostTime).Include(p => p.UserInfo).Include(p => p.PostStatus);
            return View(post.ToPagedList(page, 10));
        }
        [HttpPost]
        public ActionResult Index(string reportname, int page = 1)
        {
            var post = db.Post.OrderByDescending(p => p.PostTime).Include(p => p.UserInfo).Include(p => p.PostStatus)
                .Where(p => p.PostContent.Contains(reportname));
            return View(post.ToPagedList(page, 10));
        }

        // GET: Posts/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Post post = db.Post.Find(id);
            if (post == null)
            {
                return HttpNotFound();
            }
            return View(post);
        }

        // GET: Posts/Create
        public ActionResult Create()
        {
            ViewBag.UserID = new SelectList(db.UserInfo, "UserID", "UserName");
            ViewBag.StatusID = new SelectList(db.PostStatus, "StatusID", "Status");
            return View();
        }

        // POST: Posts/Create
        // 为了防止“过多发布”攻击，请启用要绑定到的特定属性。有关
        // 详细信息，请参阅 https://go.microsoft.com/fwlink/?LinkId=317598。
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "PostID,PostPic,PostVideo,PostContent,IsHot,IsBan,IsDIY,PostTime,UserID,StatusID")] Post post)
        {
            if (ModelState.IsValid)
            {
                db.Post.Add(post);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            ViewBag.UserID = new SelectList(db.UserInfo, "UserID", "UserName", post.UserID);
            ViewBag.StatusID = new SelectList(db.PostStatus, "StatusID", "Status", post.StatusID);
            return View(post);
        }

        // GET: Posts/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Post post = db.Post.Find(id);
            if (post == null)
            {
                return HttpNotFound();
            }
            ViewBag.UserID = new SelectList(db.UserInfo, "UserID", "UserName", post.UserID);
            ViewBag.StatusID = new SelectList(db.PostStatus, "StatusID", "Status", post.StatusID);
            return View(post);
        }

        // POST: Posts/Edit/5
        // 为了防止“过多发布”攻击，请启用要绑定到的特定属性。有关
        // 详细信息，请参阅 https://go.microsoft.com/fwlink/?LinkId=317598。
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "PostID,PostPic,PostVideo,PostContent,IsHot,IsBan,IsDIY,PostTime,UserID,StatusID")] Post post)
        {
            if (ModelState.IsValid)
            {
                db.Entry(post).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.UserID = new SelectList(db.UserInfo, "UserID", "UserName", post.UserID);
            ViewBag.StatusID = new SelectList(db.PostStatus, "StatusID", "Status", post.StatusID);
            return View(post);
        }

        // GET: Posts/DeleteConfirmed/5

        public ActionResult DeleteConfirmed(int id)
        {
            int Aid = int.Parse(Response.Cookies["AdminID"].Value);
            Post post = db.Post.Find(id);
            AdminControl ac = new AdminControl();
            ac.AdminContent = "封禁了帖子";
            ac.PostID = id;
            ac.ReportID = null;
            ac.UserID = null;
            ac.RecordTime = DateTime.Now;
            ac.AdminID = Aid;
            db.AdminControl.Find(Aid).Admin.AdminControl.Add(ac);
            db.Post.Remove(post);
            db.SaveChanges();
            return RedirectToAction("Index");
        }
        public ActionResult Ban(int id)
        {
            int Aid = int.Parse(Request.Cookies["AdminID"].Value);
            //Post post = db.Post.Find(id);
            AdminControl ac = new AdminControl();
            ac.AdminContent = "屏蔽了帖子";
            ac.PostID = id;
            ac.ReportID = null;
            ac.UserID = null;
            ac.RecordTime = DateTime.Now;
            ac.AdminID = Aid;
            db.AdminControl.Add(ac);
            db.Post.Find(id).IsBan = true;
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
