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
    public class PrivateMessageDetailsController : ApiController
    {
        private YueBoDB db = new YueBoDB();

        // GET: api/PrivateMessageDetails
        public IQueryable<PrivateMessageDetail> GetPrivateMessageDetail()
        {
            return db.PrivateMessageDetail;
        }
        //查询自己发给对方的所有私信,获取对方发给自己的只需要转换双方id
        [Route("api/GetPrivateMessagesDateil")]
        public IQueryable<object> Get(int uid1,int uid2)
        {
            var prid = db.PrivateMessage.Join(db.UserInfo, a => a.UserID, b => b.UserID, (a, b) => new
            {
                UserID = a.UserID,
                PrivateMessageID = a.PrivateMessageID,
                PrivateMessageUserID = a.PrivateMessageUserID,
                UserNick = b.UserNick,
                UserPic = b.UserPic,
                IsBan = a.IsBan
            }).Where(a => a.UserID ==uid1&&a.PrivateMessageUserID==uid2).FirstOrDefault();
            var data = db.PrivateMessageDetail.Join(db.PrivateMessage, a => a.PrivateMessageID, b => b.PrivateMessageID, (a, b) => new
            {
                UserID = b.UserID,
                PrivateMessageID = b.PrivateMessageID,
                PrivateMessageUserID = b.PrivateMessageUserID,
                PrivateMessageDetailID =a.PrivateMessageDetailID,
                PrivateMessageContent=a.PrivateMessageContent,
                PrivateMessageTime=a.PrivateMessageTime,
                UserNick = prid.UserNick,
                UserPic = prid.UserPic,
                IsBan=prid.IsBan,
                P0Weight = "right"
            }).Where(a => a.PrivateMessageID==prid.PrivateMessageID).OrderByDescending(a=>a.PrivateMessageTime);
            var prid1 = db.PrivateMessage.Join(db.UserInfo, a => a.UserID, b => b.UserID, (a, b) => new
            {
                UserID = a.UserID,
                PrivateMessageID = a.PrivateMessageID,
                PrivateMessageUserID = a.PrivateMessageUserID,
                UserNick = b.UserNick,
                UserPic = b.UserPic,
                IsBan = a.IsBan
            }).Where(a => a.UserID == uid2 && a.PrivateMessageUserID == uid1).FirstOrDefault();
            var data1 = db.PrivateMessageDetail.Join(db.PrivateMessage, a => a.PrivateMessageID, b => b.PrivateMessageID, (a, b) => new
            {
                UserID = b.UserID,
                PrivateMessageID = b.PrivateMessageID,
                PrivateMessageUserID = b.PrivateMessageUserID,
                PrivateMessageDetailID = a.PrivateMessageDetailID,
                PrivateMessageContent = a.PrivateMessageContent,
                PrivateMessageTime = a.PrivateMessageTime,
                UserNick = prid1.UserNick,
                UserPic = prid1.UserPic,
                IsBan = prid1.IsBan,
                P0Weight = "left"
            }).Where(a => a.PrivateMessageID == prid1.PrivateMessageID).OrderByDescending(a => a.PrivateMessageTime);
            var data_all = data.Concat(data1).OrderBy(a=>a.PrivateMessageTime);
            return data_all;
        }
        //发送一条消息给对方
        [Route("api/GetPrivateMessagesDateiladd")]
        public bool Get1(int advid, string content)
        {
            PrivateMessageDetail pd = new PrivateMessageDetail();
            pd.PrivateMessageID = advid;
            pd.PrivateMessageContent = content;
            pd.PrivateMessageTime = DateTime.Now;
            db.PrivateMessageDetail.Add(pd);
            return db.SaveChanges()>0;
        }
        //双方无消息获取信息
        [Route("api/GetPrivateMessagesDateilintid")]
        public int Get6(int uid1, int uid2)
        {
            int k = db.PrivateMessage.FirstOrDefault(a => a.UserID == uid1 && a.PrivateMessageUserID == uid2).PrivateMessageID;
            return k;
        }
        //读取消息
        [Route("api/GetPrivateMessagesDateilRead")]
        public bool Get2(int prid)
        {
            List<PrivateMessageDetail> pd = db.PrivateMessageDetail.Where(a => a.PrivateMessageID == prid).ToList();
            for (int i = 0; i < pd.Count; i++)
            {
                pd[i].IsRead = true;   
            }
            return db.SaveChanges() > 0;
        }
        //判断是否有未读消息
        [Route("api/GetPrivateMessagesDateilnotRead")]
        public bool Get3(int prid)
        {
            List<PrivateMessageDetail> pd = db.PrivateMessageDetail.Where(a => a.PrivateMessageID == prid).ToList();
            for (int i = 0; i < pd.Count; i++)
            {
                if (pd[i].IsRead)
                {
                    return true;
                }
            }
            return false;
        }
        // GET: api/PrivateMessageDetails/5
        [ResponseType(typeof(PrivateMessageDetail))]
        public async Task<IHttpActionResult> GetPrivateMessageDetail(int id)
        {
            PrivateMessageDetail privateMessageDetail = await db.PrivateMessageDetail.FindAsync(id);
            if (privateMessageDetail == null)
            {
                return NotFound();
            }

            return Ok(privateMessageDetail);
        }

        // PUT: api/PrivateMessageDetails/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutPrivateMessageDetail(int id, PrivateMessageDetail privateMessageDetail)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != privateMessageDetail.PrivateMessageDetailID)
            {
                return BadRequest();
            }

            db.Entry(privateMessageDetail).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PrivateMessageDetailExists(id))
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

        // POST: api/PrivateMessageDetails
        [ResponseType(typeof(PrivateMessageDetail))]
        public async Task<IHttpActionResult> PostPrivateMessageDetail(PrivateMessageDetail privateMessageDetail)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.PrivateMessageDetail.Add(privateMessageDetail);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = privateMessageDetail.PrivateMessageDetailID }, privateMessageDetail);
        }

        // DELETE: api/PrivateMessageDetails/5
        [ResponseType(typeof(PrivateMessageDetail))]
        public async Task<IHttpActionResult> DeletePrivateMessageDetail(int id)
        {
            PrivateMessageDetail privateMessageDetail = await db.PrivateMessageDetail.FindAsync(id);
            if (privateMessageDetail == null)
            {
                return NotFound();
            }

            db.PrivateMessageDetail.Remove(privateMessageDetail);
            await db.SaveChangesAsync();

            return Ok(privateMessageDetail);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool PrivateMessageDetailExists(int id)
        {
            return db.PrivateMessageDetail.Count(e => e.PrivateMessageDetailID == id) > 0;
        }
    }
}