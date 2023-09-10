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
    public class UserTypesController : ApiController
    {
        private YueBoDB db = new YueBoDB();

        // GET: api/UserTypes
        public IQueryable<UserType> GetUserType()
        {
            return db.UserType;
        }
        //获取所有类型
        [Route("api/GetUserType")]
        public IQueryable<Object> Get1()
        {
            return db.UserType.Select(a => new { a.UserTypeID, a.UserTypeName });
        }

        // GET: api/UserTypes/5
        [ResponseType(typeof(UserType))]
        public async Task<IHttpActionResult> GetUserType(int id)
        {
            UserType userType = await db.UserType.FindAsync(id);
            if (userType == null)
            {
                return NotFound();
            }

            return Ok(userType);
        }

        // PUT: api/UserTypes/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutUserType(int id, UserType userType)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != userType.UserTypeID)
            {
                return BadRequest();
            }

            db.Entry(userType).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserTypeExists(id))
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

        // POST: api/UserTypes
        [ResponseType(typeof(UserType))]
        public async Task<IHttpActionResult> PostUserType(UserType userType)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.UserType.Add(userType);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = userType.UserTypeID }, userType);
        }

        // DELETE: api/UserTypes/5
        [ResponseType(typeof(UserType))]
        public async Task<IHttpActionResult> DeleteUserType(int id)
        {
            UserType userType = await db.UserType.FindAsync(id);
            if (userType == null)
            {
                return NotFound();
            }

            db.UserType.Remove(userType);
            await db.SaveChangesAsync();

            return Ok(userType);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool UserTypeExists(int id)
        {
            return db.UserType.Count(e => e.UserTypeID == id) > 0;
        }
    }
}