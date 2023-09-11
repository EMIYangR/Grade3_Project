﻿using System;
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
    public class PostsController : ApiController
    {
        private YueBoDB db = new YueBoDB();

        // GET: api/Posts
        public IEnumerable<object> GetPost()
        {
            IEnumerable<object> p = db.Post.Select(a => new { pid = a.PostID, PostContent=a.PostContent,Likes=a.Like.Count,ContentS=a.Content.Count, Forwards=a.Forward.Count,username=a.UserInfo.UserNick,a.PostTime,pic=a.PostPic,vidio=a.PostVideo,tx= a.UserInfo.UserPic,a.StatusID,a.IsBan,a.ClickSum,a.UserID }).Where(a=>a.IsBan==false).ToList();
            return p;
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="type">查询类型1代表热门，2代表视频，3代表热搜</param>
        /// <returns></returns>
        [Route("api/GetPostsHot")]
        public IEnumerable<object> GetPost1(int type)//type 是需要查询的类型 1代表查询热门，2代表查询视频
        {
            IEnumerable<object> p = null;
            if (type==1)
            {
                p = db.Post.Select(a => new { pid = a.PostID, PostContent = a.PostContent, Likes = a.Like.Count, ContentS = a.Content.Count, Forwards = a.Forward.Count, username = a.UserInfo.UserNick, a.PostTime, pic = a.PostPic, vidio = a.PostVideo, tx = a.UserInfo.UserPic, a.StatusID, a.IsBan, a.ClickSum, a.UserID,a.IsHot }).Where(a => a.IsBan == false && a.IsHot==true).ToList();
            }
            else if(type==2)
            {
                p = db.Post.Select(a => new { pid = a.PostID, PostContent = a.PostContent, Likes = a.Like.Count, ContentS = a.Content.Count, Forwards = a.Forward.Count, username = a.UserInfo.UserNick, a.PostTime, pic = a.PostPic, vidio = a.PostVideo, tx = a.UserInfo.UserPic, a.StatusID, a.IsBan, a.ClickSum, a.UserID, a.IsHot }).Where(a => a.IsBan == false && a.vidio!="无").ToList();
            }
            else if(type==3)
            {
                p = db.Post.Select(a => new { pid = a.PostID, PostContent = a.PostContent, Likes = a.Like.Count, ContentS = a.Content.Count, Forwards = a.Forward.Count, username = a.UserInfo.UserNick, a.PostTime, pic = a.PostPic, vidio = a.PostVideo, tx = a.UserInfo.UserPic, a.StatusID, a.IsBan, a.ClickSum, a.UserID, a.IsHot }).Where(a => a.IsBan == false).OrderBy(a=>a.ClickSum).ToList();
            }
            
            return p;
        }
        [Route("api/GetmyPost")]
        public IEnumerable<object> GetPost4(int uid)
        {
            IEnumerable<object> p = db.Post.Select(a => new { pid = a.PostID, PostContent = a.PostContent, Likes = a.Like.Count, ContentS = a.Content.Count, Forwards = a.Forward.Count, username = a.UserInfo.UserNick, a.PostTime, pic = a.PostPic, vidio = a.PostVideo, tx = a.UserInfo.UserPic, a.StatusID, a.IsBan, a.ClickSum, a.UserID,a.IsHot }).Where(a => a.UserID==uid).ToList();
            
            return p;
        }
        [Route("api/Click")]
        public bool GetClick(int id)
        {
            Post p = db.Post.FirstOrDefault(a => a.PostID == id);
            p.ClickSum += 1;
            return db.SaveChanges()>0;
        }       
        [Route("api/GJC")]
        public IEnumerable<object> GetPost(string gjc)
        {
            IEnumerable<object> p = null;
            if (gjc!=null&&gjc!="")
            {
                 p= db.Post.Select(a => new { pid = a.PostID, PostContent = a.PostContent, Likes = a.Like.Count, ContentS = a.Content.Count, Forwards = a.Forward.Count, username = a.UserInfo.UserNick, a.PostTime, pic = a.PostPic, vidio = a.PostVideo, tx = a.UserInfo.UserPic,a.StatusID , a.IsBan, a.ClickSum, a.UserID }).Where(a => a.PostContent.Contains(gjc) && a.IsBan == false).ToList();
            }
            else
            {
                p = db.Post.Select(a => new { pid = a.PostID, PostContent = a.PostContent, Likes = a.Like.Count, ContentS = a.Content.Count, Forwards = a.Forward.Count, username = a.UserInfo.UserNick, a.PostTime, pic = a.PostPic, vidio = a.PostVideo, tx = a.UserInfo.UserPic, a.StatusID, a.IsBan, a.ClickSum, a.UserID }).Where(a => a.IsBan == false).ToList();
            }
            
            return p;
        }

        // GET: api/Posts/5
        [ResponseType(typeof(Post))]
        public IEnumerable<object> GetPost(int id)
        {
            IEnumerable<object> p = db.Post.Select(a => new { PostID = a.PostID, PostContent = a.PostContent, Likes = a.Like.Count, ContentS = a.Content.Count, Forwards = a.Forward.Count, username = a.UserInfo.UserNick, a.PostTime, pic = a.PostPic, vidio = a.PostVideo, tx = a.UserInfo.UserPic, a.StatusID, a.IsBan, a.ClickSum, a.UserID }).Where(a=>a.PostID==id).ToList();
            return p;
        }

        // PUT: api/Posts/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutPost(int id, Post post)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != post.PostID)
            {
                return BadRequest();
            }

            db.Entry(post).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PostExists(id))
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

        // POST: api/Posts
        [ResponseType(typeof(Post))]
        public bool PostPost(Post post)
        {
            Post ps = new Post();
            ps.PostPic = post.PostPic;
            ps.PostVideo = "无";
            ps.PostContent = post.PostContent;
            ps.IsHot = false;
            ps.IsBan = false;
            ps.IsDIY = true;
            ps.PostTime = System.DateTime.Now;
            ps.UserID = post.UserID;
            ps.StatusID = post.StatusID;
            ps.ClickSum = 0;            
            db.Post.Add(ps);
            return db.SaveChanges()>0;
        }

        // DELETE: api/Posts/5
        [ResponseType(typeof(Post))]
        public IHttpActionResult DeletePost(int id)
        {
            Post post = db.Post.Find(id);
            if (post == null)
            {
                return NotFound();
            }

            db.Post.Remove(post);
            db.SaveChanges();

            return Ok(post);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool PostExists(int id)
        {
            return db.Post.Count(e => e.PostID == id) > 0;
        }
    }
}