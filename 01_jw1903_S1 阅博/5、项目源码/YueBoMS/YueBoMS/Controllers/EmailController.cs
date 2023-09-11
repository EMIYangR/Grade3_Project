using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using YueBoMS.util;

namespace YueBoMS.Controllers
{
    public class EmailController : ApiController
    {
        // GET: api/Email
        public string Get(string email)
        {
            
            if (email!=null)
            {
                string code = EmailCode.Send(email);
                return code;
            }
            else
            {
                return "失败";
            }
            
        }
        public bool Get1(string code)
        {
            string c1 = HttpContext.Current.Session["session_mobile"].ToString();
            if (code==c1)
            {
                return true;
            }
            else
            {
                return false;
            }


        }

        // GET: api/Email/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Email
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Email/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Email/5
        public void Delete(int id)
        {
        }
    }
}
