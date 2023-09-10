using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Web;

namespace YueBoMS.util
{
    public class EmailCode
    {
        private static string GetCode()//验证码生成
        {
            string code = "";
            string num1 = (new Random().Next(500, 1000)).ToString();
            string num2 = (new Random().Next(100, 500)).ToString();
            code = num1 + num2;
            //HttpContext.Current.Session["emailCode"] = code;//写入session
            return num1 + num2;//6位数=3位数+3位数
        }
        public static string Send(string toEmail)//发送邮箱验证码
        {
            string code = GetCode();
            MailMessage m = new MailMessage();
            m.From = new MailAddress("918610601@qq.com", "阅博");//发送地址、显示抬头
            m.To.Add(toEmail);//目标邮箱
            m.Subject = "阅博_注册验证码";//标题
            //邮件内容
            m.Body = "你正在注册,您的验证码为:" +code
 + ", \r\n请勿转告他人,感谢您的使用  \r\n By:特价淘网";
            m.SubjectEncoding = System.Text.Encoding.UTF8;
            m.BodyEncoding = System.Text.Encoding.UTF8;

            SmtpClient s = new SmtpClient();
            //创建发送对象
            s.Credentials = new NetworkCredential("918610601@qq.com", "uzhjfqspevvdbcbj");//邮箱 授权码 
            s.Host = "smtp.qq.com";//服务器地址
            s.Send(m);//发送
            return code;
        }
    }
}