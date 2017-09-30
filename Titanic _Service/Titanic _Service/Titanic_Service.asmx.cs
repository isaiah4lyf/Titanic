using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Script.Services;
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
    [System.Web.Script.Services.ScriptService]
    public class Titanic_Service : System.Web.Services.WebService
    {

        [WebMethod]
        public string HelloWorld()
        {
            return "Hello World";
        }

        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
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
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        [WebMethod]
        public string Update_Speed(double speed)
        {
            LinqDataContext linq = new LinqDataContext();

            Speed speedList = (from Speed in linq.Speeds
                             where Speed.Id == 1
                             select Speed).First();
            speedList.Speed1 = speed;
            linq.SubmitChanges();
            return "Succesx";
        }

        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        [WebMethod]
        public string Insert_Coordinates(double lat,double lng)
        {
            LinqDataContext linq = new LinqDataContext();

            Coordinate cord = new Coordinate();

            cord.lat = lat;
            cord.lng = lng;
            cord.Date = DateTime.Now;
            linq.Coordinates.InsertOnSubmit(cord);
            linq.SubmitChanges();
            return "Succesx";
        }

        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        [WebMethod]
        public void Retrieve_Coordinates()
        {
            LinqDataContext linq = new LinqDataContext();
            List<object> myList = new List<object>();
            var cordList = (from Coordinate in linq.Coordinates
                             select Coordinate).ToList();

            if(cordList.Count != 0 )
            {
                for (int i = 0; i < cordList.Count; i++)
                {
                    Coordinates coo = new Coordinates();

                    coo.lat = Convert.ToDouble(cordList.ElementAt(i).lat);
                    coo.lng = Convert.ToDouble(cordList.ElementAt(i).lng);
                    myList.Add(coo);
                }
            }


            JavaScriptSerializer js = new JavaScriptSerializer();
            Context.Response.Write(js.Serialize(myList));
        }

    }
}
