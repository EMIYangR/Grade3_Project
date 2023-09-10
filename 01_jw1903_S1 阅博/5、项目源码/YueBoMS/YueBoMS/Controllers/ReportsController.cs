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
    public class ReportsController : ApiController
    {
        private YueBoDB db = new YueBoDB();

        // GET: api/Reports
        public IEnumerable<object> GetReport()
        {
            return db.Report.Select(a=>new { a.PostID,a.Reason,a.UserID,a.ReportTypeID}).ToList();
        }
        [Route("api/Report/GetByUid")]
        public IEnumerable<object> Get(int uid)
        {
             IEnumerable<object> rt= db.Report.Select(a=>new { a.PostID,a.Reason,a.UserID,a.ReportTypeID}).Where(a=>a.UserID==uid).ToList();
            return rt.Count() > 0 ? rt : null;
        }

        // GET: api/Reports/5
        [ResponseType(typeof(Report))]
        public IHttpActionResult GetReport(int id)
        {
            Report report = db.Report.Find(id);
            if (report == null)
            {
                return NotFound();
            }

            return Ok(report);
        }

        // PUT: api/Reports/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutReport(int id, Report report)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != report.ReportID)
            {
                return BadRequest();
            }

            db.Entry(report).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ReportExists(id))
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

        // POST: api/Reports
        [ResponseType(typeof(Report))]
        public IHttpActionResult PostReport(Report report)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Report.Add(report);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = report.ReportID }, report);
        }

        // DELETE: api/Reports/5
        [ResponseType(typeof(Report))]
        public IHttpActionResult DeleteReport(int id)
        {
            Report report = db.Report.Find(id);
            if (report == null)
            {
                return NotFound();
            }

            db.Report.Remove(report);
            db.SaveChanges();

            return Ok(report);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ReportExists(int id)
        {
            return db.Report.Count(e => e.ReportID == id) > 0;
        }
    }
}