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
    public class TypesController : ApiController
    {
        private YueBoDB db = new YueBoDB();

        // GET: api/Types
        public IQueryable<Models.Type> GetType()
        {
            return db.Type;
        }
        //获取所有标签
        [Route("api/GetType")]
        public IQueryable<Object> Get1()
        {
            return db.Type.Select(a => new {a.TypeID,a.TypeName });
        }
        // GET: api/Types/5
        [ResponseType(typeof(Models.Type))]
        public async Task<IHttpActionResult> GetType(int id)
        {
            Models.Type type = await db.Type.FindAsync(id);
            if (type == null)
            {
                return NotFound();
            }

            return Ok(type);
        }

        // PUT: api/Types/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutType(int id, Models.Type type)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != type.TypeID)
            {
                return BadRequest();
            }

            db.Entry(type).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TypeExists(id))
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

        // POST: api/Types
        [ResponseType(typeof(Models.Type))]
        public async Task<IHttpActionResult> PostType(Models.Type type)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Type.Add(type);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = type.TypeID }, type);
        }
        

        // DELETE: api/Types/5
        [ResponseType(typeof(Models.Type))]
        public async Task<IHttpActionResult> DeleteType(int id)
        {
            Models.Type type = await db.Type.FindAsync(id);
            if (type == null)
            {
                return NotFound();
            }

            db.Type.Remove(type);
            await db.SaveChangesAsync();

            return Ok(type);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool TypeExists(int id)
        {
            return db.Type.Count(e => e.TypeID == id) > 0;
        }
    }
}