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
    public class UserInfoesController : ApiController
    {
        private YueBoDB db = new YueBoDB();

        // GET: api/UserInfoes
        public IEnumerable<object> GetUserInfo()
        {

            IEnumerable<object> ui = db.UserInfo.Select(a => new { a.UserAccount, a.UserPwd, a.UserName }).ToList();
            return ui;
        }
        [Route("api/GetUser")]
        public IEnumerable<object> GetUserInfo(string user,string pwd)
        {

            IEnumerable<object> ui = db.UserInfo.Select(a => new { a.UserAccount, a.UserPwd, a.UserName,uid=a.UserID }).Where(a=>a.UserAccount==user&&a.UserPwd==pwd).ToList();
            if (ui.Count()>0)
            {
                return ui;
            }
            return null;
            
        }
        //public IHttpActionResult PostUserInfo(UserInfo userInfo)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    db.UserInfo.Add(userInfo);
        //    db.SaveChanges();

        //    return CreatedAtRoute("DefaultApi", new { id = userInfo.UserID }, userInfo);
        //}
        [Route("api/GetUserInfo")]
        public UserInfo Get(int uid)
        {
            UserInfo user = db.UserInfo.FirstOrDefault(a => a.UserID == uid);
            UserInfo u = new UserInfo();
            u.UserID = user.UserID;
            u.UserName = user.UserName;
            u.UserNick = user.UserNick;
            u.UserAccount = user.UserAccount;
            u.Signature = user.Signature;
            u.UserPwd = user.UserPwd;
            u.UserPic = user.UserPic;
            u.Phone = user.Phone;
            u.Email = user.Email;
            u.IDcard = user.IDcard;
            u.Sex = user.Sex;
            u.Birthday = user.Birthday;
            u.RegisterTime = user.RegisterTime;
            u.CreditScore = user.CreditScore;
            u.IsBan = user.IsBan;
            return u;
        }
        // GET: api/UserInfoes/5
        [ResponseType(typeof(UserInfo))]
        public IEnumerable<object> GetUserInfo(int id)
        {
            IEnumerable<object> ui = db.UserInfo.Select(a => new { a.UserAccount, a.UserPwd, a.UserName,a.UserID }).Where(a=>a.UserID==id).ToList();
            return ui;
        }

        // PUT: api/UserInfoes/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutUserInfo(int id, UserInfo userInfo)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != userInfo.UserID)
            {
                return BadRequest();
            }

            db.Entry(userInfo).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserInfoExists(id))
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

        // POST: api/UserInfoes
        [ResponseType(typeof(UserInfo))]
        public int PostUserInfo(UserInfo userInfo)
        {
            UserInfo ui = new UserInfo();
            ui.UserAccount = userInfo.UserAccount;
            ui.UserPwd = userInfo.UserPwd;
            ui.Email = userInfo.Email;
            ui.UserName = "无";
            ui.UserNick = "默认昵称";
            ui.Signature = "无";
            ui.UserPic = "头像7.jpg";
            ui.Phone = "";
            ui.Email = userInfo.Email;
            ui.IDcard = "";
            ui.Sex = "男";
            ui.Birthday = DateTime.Now;
            ui.RegisterTime = DateTime.Now;
            ui.CreditScore = 100;
            ui.IsBan = false;
            db.UserInfo.Add(ui);
            return db.SaveChanges();
        }
        [Route("api/UpdateUser")]
        public bool Post(UserInfo u)
        {
            //用户昵称，签名，性别，生日修改
            UserInfo user = db.UserInfo.FirstOrDefault(a => a.UserID == u.UserID);
            user.UserNick = u.UserNick;
            user.Signature = u.Signature;
            user.Sex = u.Sex;
            user.Birthday = u.Birthday;
            if (db.SaveChanges() > 0)
            {
                return true;
            }
            return false;
        }
        [Route("api/PutImage")]
        public string Post2(UserInfo user)
        {
            UserInfo u = db.UserInfo.FirstOrDefault(a => a.UserID == user.UserID);
            if (u.UserPic == user.UserPic)
            {
                return "repeat";
            }
            else
            {
                u.UserPic = user.UserPic;
            }
            if (db.SaveChanges() > 0)
            {
                return "true";
            }
            return "false";
        }
        [Route("api/PutUserNum")]
        public bool post3(int uid,string name,string num)
        {
            UserInfo u = db.UserInfo.FirstOrDefault(a => a.UserID == uid);
            IEnumerable<object> us = db.UserInfo.Select(a =>new {a.IDcard}).ToList();
            if (db.UserInfo.Select(a=>a.IDcard).Contains(num))
            {
                return false; 
            }
            
            u.UserName = name;
            u.IDcard = num;
            return db.SaveChanges()>0;
        }
        [Route("api/PutUserPhone")]
        public string post4(int uid, string phone)
        {
            UserInfo u = db.UserInfo.FirstOrDefault(a => a.UserID == uid);
            IEnumerable<object> us = db.UserInfo.Select(a => new { a.Phone }).ToList();
            if (db.UserInfo.Select(a => a.Phone).Contains(phone))
            {
                return "repeat";
            }

            u.Phone = phone;
            if (db.SaveChanges() > 0)
            {
                return "true";
            }
            return "false";

        }
        // DELETE: api/UserInfoes/5
        [ResponseType(typeof(UserInfo))]
        public IHttpActionResult DeleteUserInfo(int id)
        {
            UserInfo userInfo = db.UserInfo.Find(id);
            if (userInfo == null)
            {
                return NotFound();
            }

            db.UserInfo.Remove(userInfo);
            db.SaveChanges();

            return Ok(userInfo);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool UserInfoExists(int id)
        {
            return db.UserInfo.Count(e => e.UserID == id) > 0;
        }
    }
}