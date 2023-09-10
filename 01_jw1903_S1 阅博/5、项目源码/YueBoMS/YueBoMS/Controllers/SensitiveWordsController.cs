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
    public class SensitiveWordsController : ApiController
    {
        private YueBoDB db = new YueBoDB();

        // GET: api/SensitiveWords
        public IQueryable<SensitiveWord> GetSensitiveWord()
        {
            return db.SensitiveWord;
        }

        // GET: api/SensitiveWords/5
        [ResponseType(typeof(SensitiveWord))]
        public IHttpActionResult GetSensitiveWord(int id)
        {
            SensitiveWord sensitiveWord = db.SensitiveWord.Find(id);
            if (sensitiveWord == null)
            {
                return NotFound();
            }

            return Ok(sensitiveWord);
        }

        // PUT: api/SensitiveWords/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutSensitiveWord(int id, SensitiveWord sensitiveWord)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != sensitiveWord.SensitiveWordID)
            {
                return BadRequest();
            }

            db.Entry(sensitiveWord).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SensitiveWordExists(id))
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

        // POST: api/SensitiveWords
        [ResponseType(typeof(SensitiveWord))]
        public IHttpActionResult PostSensitiveWord(SensitiveWord sensitiveWord)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.SensitiveWord.Add(sensitiveWord);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = sensitiveWord.SensitiveWordID }, sensitiveWord);
        }

        // DELETE: api/SensitiveWords/5
        [ResponseType(typeof(SensitiveWord))]
        public IHttpActionResult DeleteSensitiveWord(int id)
        {
            SensitiveWord sensitiveWord = db.SensitiveWord.Find(id);
            if (sensitiveWord == null)
            {
                return NotFound();
            }

            db.SensitiveWord.Remove(sensitiveWord);
            db.SaveChanges();

            return Ok(sensitiveWord);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool SensitiveWordExists(int id)
        {
            return db.SensitiveWord.Count(e => e.SensitiveWordID == id) > 0;
        }
    }
}