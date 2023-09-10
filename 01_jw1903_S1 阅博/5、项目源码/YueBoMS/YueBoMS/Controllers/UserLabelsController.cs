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
    public class UserLabelsController : ApiController
    {
        private YueBoDB db = new YueBoDB();

        // GET: api/UserLabels
        public IQueryable<UserLabel> GetUserLabel()
        {
            return db.UserLabel;
        }
        [Route("api/GetLabel")]
        public IQueryable<Object> Get(int uid)
        {
            var fol = db.Type.Join(db.UserLabel, a => a.TypeID, b => b.TypeID, (a, b) => new {
                UserID = b.UserID,
                UserLabelID = b.UserLabelID,
                TypeID = b.TypeID,
                TypeName = a.TypeName,

            }).Where(b => b.UserID == uid);
            return fol;
        }
       
        // GET: api/UserLabels/5
        [ResponseType(typeof(UserLabel))]
        public IHttpActionResult GetUserLabel(int id)
        {
            UserLabel userLabel = db.UserLabel.Find(id);
            if (userLabel == null)
            {
                return NotFound();
            }

            return Ok(userLabel);
        }

        // PUT: api/UserLabels/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutUserLabel(int id, UserLabel userLabel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != userLabel.UserLabelID)
            {
                return BadRequest();
            }

            db.Entry(userLabel).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserLabelExists(id))
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

        // POST: api/UserLabels
        [ResponseType(typeof(UserLabel))]
        public IHttpActionResult PostUserLabel(UserLabel userLabel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.UserLabel.Add(userLabel);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = userLabel.UserLabelID }, userLabel);
        }
        //增加用户的标签信息
        [Route("api/PutUserLabeladd")]
        public bool Post1(int uid, int tid)
        {
            UserLabel ul = new UserLabel();
            ul.UserID = uid;
            ul.TypeID = tid;
            db.UserLabel.Add(ul);
            return db.SaveChanges() > 0;
        }
        //减少用户的标签信息
        [Route("api/PutUserLabeldelete")]
        public bool Post2(int uid, int ulid)
        {
            UserLabel ul = db.UserLabel.FirstOrDefault(a => a.UserID == uid && a.UserLabelID == ulid);
            db.UserLabel.Remove(ul);
            return db.SaveChanges() > 0;
        }

        // DELETE: api/UserLabels/5
        [ResponseType(typeof(UserLabel))]
        public IHttpActionResult DeleteUserLabel(int id)
        {
            UserLabel userLabel = db.UserLabel.Find(id);
            if (userLabel == null)
            {
                return NotFound();
            }

            db.UserLabel.Remove(userLabel);
            db.SaveChanges();

            return Ok(userLabel);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool UserLabelExists(int id)
        {
            return db.UserLabel.Count(e => e.UserLabelID == id) > 0;
        }
    }
}