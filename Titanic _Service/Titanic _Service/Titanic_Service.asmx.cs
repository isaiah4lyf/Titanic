using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Services;

namespace Titanic__Service
{
    /// <summary>
    /// Summary description for Titanic_Service
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    // [System.Web.Script.Services.ScriptService]
    public class Titanic_Service : System.Web.Services.WebService
    {

        [WebMethod]
        public string HelloWorld()
        {
            return "Hello World";
        }

        [WebMethod]
        public void Retrieve_Speed()
        {
            LinqDataContext linq = new LinqDataContext();
            List<object> myList = new List<object>();
            var speedList = (from Speed in linq.Speeds
                             where Speed.Id == 1
                             select Speed).ToList();

            Retrieve_Speed speed = new Retrieve_Speed();

            speed.speed = Convert.ToDouble(speedList.ElementAt(0).Speed1);
            myList.Add(speed);

            JavaScriptSerializer js = new JavaScriptSerializer();
            Context.Response.Write(js.Serialize(myList));
        }
    }
}
