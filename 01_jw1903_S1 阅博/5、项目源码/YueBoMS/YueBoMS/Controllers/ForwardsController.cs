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
    public class ForwardsController : ApiController
    {
        private YueBoDB db = new YueBoDB();

        // GET: api/Forwards
        public IEnumerable<object> GetForward()
        {
            IEnumerable<object> cm = db.Forward.Select(a => new { a.ForwardID,a.UserID,a.ForwardContent,a.UserInfo.UserName,a.UserInfo.UserPic,a.PostID }).ToList();
            return cm.Count() > 0 ? cm : null;
        }
        [Route("api/GetByid")]
        public IEnumerable<object> GetForward1(int id)
        {
            IEnumerable<object> cm = db.Forward.Select(a => new { a.ForwardID, a.UserID, a.ForwardContent, a.UserInfo.UserName, a.UserInfo.UserPic, a.PostID }).Where(a => a.PostID == id).ToList();
            return cm.Count() > 0 ? cm : null;
        }

        // GET: api/Forwards/5
        [ResponseType(typeof(Forward))]
        public IHttpActionResult GetForward(int id)
        {
            Forward forward = db.Forward.Find(id);
            if (forward == null)
            {
                return NotFound();
            }

            return Ok(forward);
        }

        // PUT: api/Forwards/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutForward(int id, Forward forward)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != forward.ForwardID)
            {
                return BadRequest();
            }

            db.Entry(forward).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ForwardExists(id))
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

        // POST: api/Forwards
        [ResponseType(typeof(Forward))]
        public IHttpActionResult PostForward(Forward forward)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Forward.Add(forward);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = forward.ForwardID }, forward);
        }

        // DELETE: api/Forwards/5
        [ResponseType(typeof(Forward))]
        public IHttpActionResult DeleteForward(int id)
        {
            Forward forward = db.Forward.Find(id);
            if (forward == null)
            {
                return NotFound();
            }

            db.Forward.Remove(forward);
            db.SaveChanges();

            return Ok(forward);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ForwardExists(int id)
        {
            return db.Forward.Count(e => e.ForwardID == id) > 0;
        }
    }
}