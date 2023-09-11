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
    public class FollowsController : ApiController
    {
        private YueBoDB db = new YueBoDB();

        // GET: api/Follows
        public IEnumerable<object> GetFollow()
        {
            return db.Follow.Select(a => new { a.FollowUserID, a.FollowTime, a.UserID });
        }
        [Route("api/GetUserFollow")]
        public IQueryable<Object> Get1(int uid)
        {
            //关注
            var fol = db.UserInfo.Join(db.Follow, a => a.UserID, b => b.FollowUserID, (a, b) => new {
                FollowUserID = b.FollowUserID,
                FollowID = b.FollowID,
                UserID1 = b.UserID,
                FollowTime = b.FollowTime,
                UserID = a.UserID,
                UserName = a.UserName,
                UserNick = a.UserNick,
                UserAccount = a.UserAccount,
                Signature = a.Signature,
                UserPwd = a.UserPwd,
                UserPic = a.UserPic,
                Phone = a.Phone,
                Email = a.Email,
                IDcard = a.IDcard,
                Sex = a.Sex,
                Birthday = a.Birthday,
                RegisterTime = a.RegisterTime,
                CreditScore = a.CreditScore,
                IsBan = a.IsBan
            }).Where(c => c.UserID1 == uid).OrderByDescending(c => c.FollowTime);
            return fol;
        }
        [Route("api/GetFollowUser")]
        public IQueryable<Object> Get2(int uid)
        {
            //粉丝
            var fol = db.UserInfo.Join(db.Follow, a => a.UserID, b => b.UserID, (a, b) => new {
                FollowUserID = b.FollowUserID,
                FollowID = b.FollowID,
                UserID1 = b.UserID,
                FollowTime = b.FollowTime,
                UserID = a.UserID,
                UserName = a.UserName,
                UserNick = a.UserNick,
                UserAccount = a.UserAccount,
                Signature = a.Signature,
                UserPwd = a.UserPwd,
                UserPic = a.UserPic,
                Phone = a.Phone,
                Email = a.Email,
                IDcard = a.IDcard,
                Sex = a.Sex,
                Birthday = a.Birthday,
                RegisterTime = a.RegisterTime,
                CreditScore = a.CreditScore,
                IsBan = a.IsBan
            }).Where(b => b.FollowUserID == uid).OrderByDescending(a => a.FollowTime);

            return fol;
        }
        [Route("api/GetByUid")]
        public IEnumerable<object> Get(int uid)
        {
            IEnumerable<object> fw=db.Follow.Select(a=>new { a.FollowUserID,a.FollowTime,a.UserID}).Where(a=>a.UserID==uid);
            if (fw.Count() > 0)
            {
                return fw;
            }
            else
            {
                return null;
            }
        }
        [Route("api/GetFans")]
        public IEnumerable<object> Get3(int uid)
        {
            IEnumerable<object> fw=db.Follow.Select(a=>new { a.FollowUserID,a.FollowTime,a.UserID}).Where(a=>a.FollowUserID==uid);
            if (fw.Count() > 0)
            {
                return fw;
            }
            else
            {
                return null;
            }
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="id">用户的id</param>
        /// <param name="uid">关注人的用户id</param>
        /// <returns></returns>
        [Route("api/Delete1")]
        public bool GetFollow1(int id, int uid)
        {
            Follow f = db.Follow.FirstOrDefault(a => a.UserID == id && a.FollowUserID == uid);
            db.Follow.Remove(f);
            return db.SaveChanges() > 0;
        }
        // GET: api/Follows/5
        [ResponseType(typeof(Follow))]
        public IHttpActionResult GetFollow(int id)
        {
            Follow follow = db.Follow.Find(id);
            if (follow == null)
            {
                return NotFound();
            }

            return Ok(follow);
        }

        // PUT: api/Follows/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutFollow(int id, Follow follow)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != follow.FollowID)
            {
                return BadRequest();
            }

            db.Entry(follow).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FollowExists(id))
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

        // POST: api/Follows
        [ResponseType(typeof(Follow))]
        public bool PostFollow(Follow follow)
        {
            Follow f1 = new Follow();
            f1.FollowTime = Convert.ToDateTime(System.DateTime.Now.ToString("G"));
            f1.FollowUserID = follow.FollowUserID;
            f1.UserID = follow.UserID;
            db.Follow.Add(f1);
            return db.SaveChanges() > 0;
        }

        // DELETE: api/Follows/5
        [ResponseType(typeof(Follow))]
        public IHttpActionResult DeleteFollow(int id)
        {
            Follow follow = db.Follow.Find(id);
            if (follow == null)
            {
                return NotFound();
            }

            db.Follow.Remove(follow);
            db.SaveChanges();

            return Ok(follow);
            
        }
        [Route("api/Delete")]
        public bool DeleteFollow1(int id,int uid)
        {
           Follow f=db.Follow.FirstOrDefault(a => a.UserID == id && a.FollowUserID == uid);
            db.Follow.Remove(f);
            return db.SaveChanges() > 0;
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool FollowExists(int id)
        {
            return db.Follow.Count(e => e.FollowID == id) > 0;
        }
    }
}