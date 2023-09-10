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
    public class PrivateMessagesController : ApiController
    {
        private YueBoDB db = new YueBoDB();

        // GET: api/PrivateMessages
        public IQueryable<PrivateMessage> GetPrivateMessage()
        {
            return db.PrivateMessage;
        }
        //全查用户的私信表
        [Route("api/GetPrivateMessages")]
        public IQueryable<object> Get(int uid)
        {
            PrivateMessagesController pc = new PrivateMessagesController();
            var data = db.PrivateMessage.Join(db.UserInfo, a => a.PrivateMessageUserID, b => b.UserID, (a, b) => new
            {
                UserID = a.UserID,
                PrivateMessageID = a.PrivateMessageID,
                PrivateMessageUserID = b.UserID,
                UserNick = b.UserNick,
                UserPic = b.UserPic,
                IsBan = a.IsBan,
                IsRead = (db.PrivateMessageDetail.Join(db.PrivateMessage, c => c.PrivateMessageID, d => d.PrivateMessageID, (c, d) => new
                {
                    UserID = d.UserID,
                    PrivateMessageUserID = d.PrivateMessageUserID,
                    IsRead = c.IsRead
                }).Where(k => k.PrivateMessageUserID == a.UserID && k.UserID == a.PrivateMessageUserID && k.IsRead == false).ToList().Count > 0)
            }).Where(a => a.UserID == uid && a.IsBan == false);
            return data;
        }
        //判断用户是否有其私信
        [Route("api/GetPrivateMessagesIsNot")]
        public string Get1(int uid1, int uid2)
        {
            db.PrivateMessage.FirstOrDefault(a => a.UserID == uid1 && a.PrivateMessageUserID == uid2 && a.IsBan == false);
            if (db.PrivateMessage.FirstOrDefault(a => a.UserID == uid1 && a.PrivateMessageUserID == uid2) != null)
            {
                if (db.PrivateMessage.FirstOrDefault(a => a.UserID == uid1 && a.PrivateMessageUserID == uid2 && a.IsBan == false) != null)
                {
                    return "true";
                }
                return "forbid";
            }
            return "false";
        }
        //将对应用户加入私信表
        [Route("api/GetPrivateMessagesAdd")]
        public bool Get2(int uid1, int uid2)
        {
            bool k = false;
            PrivateMessage p = new PrivateMessage();
            p.UserID = uid1;
            p.PrivateMessageUserID = uid2;
            p.IsBan = false;
            db.PrivateMessage.Add(p);
            if (db.SaveChanges() > 0)
            {
                k = true;
            }
            else
            {
                k = false;
            }
            PrivateMessage p1 = new PrivateMessage();
            p1.UserID = uid2;
            p1.PrivateMessageUserID = uid1;
            p1.IsBan = false;
            db.PrivateMessage.Add(p1);
            if (db.SaveChanges() > 0)
            {
                k = true;
            }
            else
            {
                k = false;
            }
            return k;
        }
        //禁言对方
        [Route("api/GetPrivateMessagesNotChat")]
        public bool Get7(int uid1, int uid2)
        {
            PrivateMessage p = db.PrivateMessage.FirstOrDefault((a => a.UserID == uid1 && a.PrivateMessageUserID == uid2));
            p.IsBan = true;
            return db.SaveChanges()>0;
        }
        // GET: api/PrivateMessages/5
        [ResponseType(typeof(PrivateMessage))]
        public async Task<IHttpActionResult> GetPrivateMessage(int id)
        {
            PrivateMessage privateMessage = await db.PrivateMessage.FindAsync(id);
            if (privateMessage == null)
            {
                return NotFound();
            }

            return Ok(privateMessage);
        }

        // PUT: api/PrivateMessages/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutPrivateMessage(int id, PrivateMessage privateMessage)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != privateMessage.PrivateMessageID)
            {
                return BadRequest();
            }

            db.Entry(privateMessage).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PrivateMessageExists(id))
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

        // POST: api/PrivateMessages
        [ResponseType(typeof(PrivateMessage))]
        public async Task<IHttpActionResult> PostPrivateMessage(PrivateMessage privateMessage)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.PrivateMessage.Add(privateMessage);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = privateMessage.PrivateMessageID }, privateMessage);
        }
        // DELETE: api/PrivateMessages/5
        [ResponseType(typeof(PrivateMessage))]
        public async Task<IHttpActionResult> DeletePrivateMessage(int id)
        {
            PrivateMessage privateMessage = await db.PrivateMessage.FindAsync(id);
            if (privateMessage == null)
            {
                return NotFound();
            }

            db.PrivateMessage.Remove(privateMessage);
            await db.SaveChangesAsync();

            return Ok(privateMessage);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool PrivateMessageExists(int id)
        {
            return db.PrivateMessage.Count(e => e.PrivateMessageID == id) > 0;
        }
    }
}