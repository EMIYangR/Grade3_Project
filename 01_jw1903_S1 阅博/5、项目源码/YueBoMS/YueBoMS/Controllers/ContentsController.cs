using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using YueBoMS.Models;

namespace YueBoMS.Controllers
{
    public class ContentsController : ApiController
    {
        private YueBoDB db = new YueBoDB();

        // GET: api/Contents
        public IEnumerable<object> GetContent()
        {
            IEnumerable<object> cm= db.Content.Select(a => new { a.PostID, a.ContentID, a.ContentTime, a.ContentDesc, a.FatherContentID, a.UserInfo.UserPic, a.UserInfo.UserName }).ToList();
            return cm.Count()>0? cm:null;
        }
        //public IEnumerable<object> GetContent(string comtent)
        //{
            
        //    return cm.Count() > 0 ? cm : null;
        //}

        // GET: api/Contents/5
        [ResponseType(typeof(Content))]
        public IEnumerable<object> GetContent(int id)
        {
            IEnumerable<object> cm = db.Content.Select(a => new { a.PostID, a.ContentID, a.ContentTime, a.ContentDesc, a.FatherContentID, a.UserInfo.UserPic, a.UserInfo.UserName }).Where(a => a.PostID == id).ToList();
            return cm.Count() > 0 ? cm : null;
        }

        // PUT: api/Contents/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutContent(int id, Content content)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != content.ContentID)
            {
                return BadRequest();
            }

            db.Entry(content).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ContentExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Contents
        [ResponseType(typeof(Content))]
        public bool PostContent(Content content)
        {
            Content ct = new Content();
            ct.ContentDesc = content.ContentDesc;
            ct.ContentTime = Convert.ToDateTime(System.DateTime.Now.ToString("G"));
            ct.PostID = content.PostID;
            ct.FatherContentID = content.FatherContentID;
            ct.UserID = content.UserID;
            db.Content.Add(ct);
            return db.SaveChanges() > 0;

        }

        // DELETE: api/Contents/5
        [ResponseType(typeof(Content))]
        public IHttpActionResult DeleteContent(int id)
        {
            Content content = db.Content.Find(id);
            if (content == null)
            {
                return NotFound();
            }

            db.Content.Remove(content);
            db.SaveChanges();

            return Ok(content);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ContentExists(int id)
        {
            return db.Content.Count(e => e.ContentID == id) > 0;
        }
    }
}