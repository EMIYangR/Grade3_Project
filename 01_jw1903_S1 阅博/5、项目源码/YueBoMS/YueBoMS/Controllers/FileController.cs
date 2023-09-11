using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Web;
using System.Web.Hosting;
using System.Web.Http;
using YueBoMS.util;
using HttpGetAttribute = System.Web.Http.HttpGetAttribute;
using RouteAttribute = System.Web.Http.RouteAttribute;

namespace YueBoMS.Controllers
{
    public class FileController : ApiController
    {
        [Route("api/Pic2")]
        public async Task<IHttpActionResult> PostUploadImage()
        {
            var httpRequest = HttpContext.Current.Request;
            if (httpRequest.Files.Count < 1)
            {
                return BadRequest("未上传图片");
            }
            var postedFile = httpRequest.Files[0];
            var filePath = HttpContext.Current.Server.MapPath("~/Uploads/images/" + postedFile.FileName);
            postedFile.SaveAs(filePath);
            return Ok("图片上传成功");
        }
        [Route("api/vi")]
        public async Task<IHttpActionResult> PostUploadvidio()
        {
            var httpRequest = HttpContext.Current.Request;
            if (httpRequest.Files.Count < 1)
            {
                return BadRequest("未上传视频");
            }
            var postedFile = httpRequest.Files[0];
            var filePath = HttpContext.Current.Server.MapPath("~/Video/" + postedFile.FileName);
            postedFile.SaveAs(filePath);
            return Ok("视频上传成功");
        }
        [Route("api/GeiPic")]
        public HttpResponseMessage GetPic(string folderName, string fileName)
        {
            var filePath = HttpContext.Current.Server.MapPath("~/" + folderName + "/" + fileName);
            var response = new HttpResponseMessage(HttpStatusCode.OK);
            var fileStream = new FileStream(filePath, FileMode.Open);
            response.Content = new StreamContent(fileStream);
            response.Content.Headers.ContentType = new MediaTypeHeaderValue("image/jpeg"); // 设置响应类型为 JPEG 图像
            return response;
        }[Route("api/Geivi")]
        public HttpResponseMessage GetVi(string fileName)//string folderName, string fileName
        {
            //var videoFolderPath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Videos", folderName);
            //var videoFilePath = Path.Combine(videoFolderPath, fileName);

            //if (!File.Exists(videoFilePath))
            //{
            //    return new HttpResponseMessage(HttpStatusCode.NotFound);
            //}

            //var response = new HttpResponseMessage();
            //response.Content = new StreamContent(File.OpenRead(videoFilePath));
            //response.Content.Headers.ContentType = new MediaTypeHeaderValue("video/mp4");

            //return response;
            string videoFilePath = HostingEnvironment.MapPath("~/Uploads/images/" + fileName);  // 视频文件的相对路径

            if (File.Exists(videoFilePath))
            {
                HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);
                response.Content = new StreamContent(new FileStream(videoFilePath, FileMode.Open, FileAccess.Read));
                response.Content.Headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue("video/mp4");
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, "视频文件未找到。");
            }
        }
        [Route("api/UrlImage")]
        public bool PostUploadImage1()
        {
            var httpRequest = HttpContext.Current.Request;
            if (httpRequest.Files.Count < 1)
            {
                return false;
            }
            var postedFile = httpRequest.Files[0];
            var filePath = HttpContext.Current.Server.MapPath("~/Uploads/images/tx/" + postedFile.FileName);
            postedFile.SaveAs(filePath);
            return true;
        }
        [Route("api/UrlImage2")]
        public bool PostUploadImage2()
        {
            var httpRequest = HttpContext.Current.Request;
            if (httpRequest.Files.Count < 1)
            {
                return false;
            }
            var postedFile = httpRequest.Files[0];
            var filePath = HttpContext.Current.Server.MapPath("~/Uploads/images/Authentication/" + postedFile.FileName);
            postedFile.SaveAs(filePath);
            return true;
        }
    }
 

    
}
