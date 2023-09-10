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
    public class LikesController : ApiController
    {
        private YueBoDB db = new YueBoDB();

        // GET: api/Likes
        public IEnumerable<object> GetLike()
        {
            return db.Like.Select(a=>new { a.PostID,a.UserID}).ToList();
        }
        [Route("api/Like/GetByUid")]
        public IEnumerable<object> Get(int uid)
        {
            IEnumerable<object> le= db.Like.Select(a=>new { a.PostID,a.UserID}).Where(a=>a.UserID==uid).ToList();
            return le.Count() > 0 ? le : null;
        }

        // GET: api/Likes/5
        [ResponseType(typeof(Like))]
        public IHttpActionResult GetLike(int id)
        {
            Like like = db.Like.Find(id);
            if (like == null)
            {
                return NotFound();
            }

            return Ok(like);
        }

        // PUT: api/Likes/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutLike(int id, Like like)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != like.LikeID)
            {
                return BadRequest();
            }

            db.Entry(like).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LikeExists(id))
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

        // POST: api/Likes
        [ResponseType(typeof(Like))]
        public IHttpActionResult PostLike(Like like)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Like.Add(like);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = like.LikeID }, like);
        }

        // DELETE: api/Likes/5
        [ResponseType(typeof(Like))]
        public IHttpActionResult DeleteLike(int id)
        {
            Like like = db.Like.Find(id);
            if (like == null)
            {
                return NotFound();
            }

            db.Like.Remove(like);
            db.SaveChanges();

            return Ok(like);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool LikeExists(int id)
        {
            return db.Like.Count(e => e.LikeID == id) > 0;
        }
    }
}