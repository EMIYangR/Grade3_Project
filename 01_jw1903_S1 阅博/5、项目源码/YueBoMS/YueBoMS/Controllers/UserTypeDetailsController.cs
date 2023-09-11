using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using YueBoMS.Models;

namespace YueBoMS.Controllers
{
    public class UserTypeDetailsController : ApiController
    {
        private YueBoDB db = new YueBoDB();

        // GET: api/UserTypeDetails
        public IQueryable<UserTypeDetail> GetUserTypeDetail()
        {
            return db.UserTypeDetail;
        }
        [Route("api/TypeDetail")]
        public IQueryable<Object> Get(int uid)
        {
            var fol = db.UserType.Join(db.UserTypeDetail, a => a.UserTypeID, b => b.UserTypeID, (a, b) => new
            {
                UserID = b.UserID,
                UserTypeDetailID = b.UserTypeDetailID,
                IsAuthentication = b.IsAuthentication,
                UserTypeID = a.UserTypeID,
                UserTypeName = a.UserTypeName
            }).Where(b => b.UserID == uid && b.IsAuthentication == 1);
            return fol;
        }
        [Route("api/GetUseraudit")]
        public IQueryable<Object> Get1(int uid)
        {
            var fol = db.UserType.Join(db.UserTypeDetail, a => a.UserTypeID, b => b.UserTypeID, (a, b) => new {
                UserID = b.UserID,
                UserTypeDetailID = b.UserTypeDetailID,
                IsAuthentication = b.IsAuthentication,
                UserTypeID = a.UserTypeID,
                UserTypeName = a.UserTypeName,
                ReviewPic = b.ReviewPic
            }).Where(b => b.UserID == uid);
            return fol;
        }

        // GET: api/UserTypeDetails/5
        [ResponseType(typeof(UserTypeDetail))]
        public async Task<IHttpActionResult> GetUserTypeDetail(int id)
        {
            UserTypeDetail userTypeDetail = await db.UserTypeDetail.FindAsync(id);
            if (userTypeDetail == null)
            {
                return NotFound();
            }

            return Ok(userTypeDetail);
        }

        // PUT: api/UserTypeDetails/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutUserTypeDetail(int id, UserTypeDetail userTypeDetail)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != userTypeDetail.UserTypeDetailID)
            {
                return BadRequest();
            }

            db.Entry(userTypeDetail).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserTypeDetailExists(id))
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

        // POST: api/UserTypeDetails
        [ResponseType(typeof(UserTypeDetail))]
        public async Task<IHttpActionResult> PostUserTypeDetail(UserTypeDetail userTypeDetail)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.UserTypeDetail.Add(userTypeDetail);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = userTypeDetail.UserTypeDetailID }, userTypeDetail);
        }
        [Route("api/TypeDetailadd")]
        public bool post1(UserTypeDetail u)
        {
            u.IsAuthentication = 2;
            db.UserTypeDetail.Add(u);

            return db.SaveChanges() > 0;
        }

        // DELETE: api/UserTypeDetails/5
        [ResponseType(typeof(UserTypeDetail))]
        public async Task<IHttpActionResult> DeleteUserTypeDetail(int id)
        {
            UserTypeDetail userTypeDetail = await db.UserTypeDetail.FindAsync(id);
            if (userTypeDetail == null)
            {
                return NotFound();
            }

            db.UserTypeDetail.Remove(userTypeDetail);
            await db.SaveChangesAsync();

            return Ok(userTypeDetail);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool UserTypeDetailExists(int id)
        {
            return db.UserTypeDetail.Count(e => e.UserTypeDetailID == id) > 0;
        }
    }
}