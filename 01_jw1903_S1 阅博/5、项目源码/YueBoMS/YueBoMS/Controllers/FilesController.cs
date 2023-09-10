using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace YueBoMS.Controllers
{
    public class FilesController : ApiController
    {
        [Route("api/UrlImage")]
        public bool PostUploadImage()
        {
            var httpRequest = HttpContext.Current.Request;
            if (httpRequest.Files.Count < 1)
            {
                return false;
            }
            var postedFile = httpRequest.Files[0];
            var filePath = HttpContext.Current.Server.MapPath("~/Content/images/tx/" + postedFile.FileName);
            postedFile.SaveAs(filePath);
            return true;
        }
        [Route("api/UrlImage2")]
        public bool PostUploadImage1()
        {
            var httpRequest = HttpContext.Current.Request;
            if (httpRequest.Files.Count < 1)
            {
                return false;
            }
            var postedFile = httpRequest.Files[0];
            var filePath = HttpContext.Current.Server.MapPath("~/Content/images/Authentication/" + postedFile.FileName);
            postedFile.SaveAs(filePath);
            return true;
        }
        

    }
}
