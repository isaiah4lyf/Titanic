package com.example.isaia.titanic_navigation_server;

import android.net.wifi.WifiManager;
import android.os.AsyncTask;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.text.format.Formatter;
import android.widget.TextView;
import android.widget.Toast;

import org.ksoap2.SoapEnvelope;
import org.ksoap2.serialization.SoapObject;
import org.ksoap2.serialization.SoapPrimitive;
import org.ksoap2.serialization.SoapSerializationEnvelope;
import org.ksoap2.transport.HttpTransportSE;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.Scanner;


public class MainActivity extends AppCompatActivity {

    private ServerSocket server;
    private boolean			running;
    private int port;
    private TextView text;
    private Socket			connectionToClient;
    private OutputStream	os;
    private InputStream is;
    private PrintWriter		txtout;
    private PrintWriter  ToFile;
    private Scanner FromFile;
    private File file;
    private BufferedReader	txtin;
    private String Location;
    private FileWriter	logFile;
    private FileReader readFile;
    private File log;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Update_Message clas = new Update_Message();
        clas.execute();
        text = (TextView)findViewById(R.id.text);
        try
        {

            Toast.makeText(getApplicationContext(),"Creating server", Toast.LENGTH_LONG).show();
            server = new ServerSocket(2015);
            running = true;
            Message message_retriever = new Message();
            Thread thread2 = new Thread(message_retriever);
            thread2.start();



        }
        catch (Exception ex)
        {
            Toast.makeText(getApplicationContext(),ex.toString(), Toast.LENGTH_LONG).show();
        }

    }

    private class Message implements Runnable {

        @Override
        public void run() {
            // Loop for ten iterations.

            text.setText("e");
            while (running)
            {
                try
                {
                    //text.setText("xo");
                    Socket newConnectionToClient = server.accept();
                    //text.setText("ok");


                    Server_Class_2 handler = new Server_Class_2(newConnectionToClient);
                    Thread clientThread = new Thread(handler);

                    clientThread.start();
                    //text.setText("started");
                }
                catch (Exception ex)
                {
                    //Toast.makeText(getApplicationContext(),ex.toString(), Toast.LENGTH_LONG).show();
                }
            }

        }

    }



    private class Server_Class_2 implements Runnable {

        private Socket connectionToClient2;
        public Server_Class_2(Socket socketConnectionToClient)
        {
            connectionToClient2 = socketConnectionToClient;

        }
        @Override
        public void run() {
            //	Process commands from client

            boolean processing = true;
            String name = "";
            while (processing)

                try {
                    os = connectionToClient2.getOutputStream();
                    is = new BufferedInputStream(connectionToClient2.getInputStream());


                    txtin = new BufferedReader(new InputStreamReader(connectionToClient2.getInputStream()));
                    txtout = new PrintWriter(os);
                    String speed = txtin.readLine();
                    text.setText(speed);
                    if(speed != null)
                    {
                        Forwad_Speed tt = new Forwad_Speed();
                        tt.execute(new String[]{speed});
                    }



                } catch (Exception e) {

                }

            }
        }




    private class Forwad_Speed extends AsyncTask<String, Void, String> {

        @Override
        protected void onPreExecute() {
            //if you want, start progress dialog here
        }

        @Override
        protected String doInBackground(String... urls) {
            String Collections = "";


            try {
                final String NAMESPACE = "http://tempuri.org/";
                final String URL = "http://10.254.116.132/Titanic_Service/";
                //final String URL = "http://192.168.43.175:80/Repository_Service/";
                final String SOAP_ACTION = "http://tempuri.org/Update_Speed";
                final String METHOD_NAME = "Update_Speed";
                SoapObject request = new SoapObject(NAMESPACE, METHOD_NAME);


                request.addProperty("speed", urls[0]);


                SoapSerializationEnvelope envelope = new SoapSerializationEnvelope(SoapEnvelope.VER11);
                envelope.dotNet = true;
                envelope.setOutputSoapObject(request);
                HttpTransportSE androidHttpTransport = new HttpTransportSE(URL);
                androidHttpTransport.call(SOAP_ACTION, envelope);
                SoapPrimitive response = (SoapPrimitive) envelope.getResponse();


                Collections = response.toString();

            } catch (Exception e) {
                Collections = e.getLocalizedMessage();
            }


            return Collections;
        }

        @Override
        protected void onPostExecute(String result) {
            //if you started progress dialog dismiss it here
            Toast.makeText(getApplicationContext(),result, Toast.LENGTH_LONG).show();


        }


    }



    private class Update_Message extends AsyncTask<String, Void, String> {

        @Override
        protected void onPreExecute() {
            //if you want, start progress dialog here
        }

        @Override
        protected String doInBackground(String... urls) {
            String Collections = "";

            try {
                WifiManager wm = (WifiManager) getSystemService(WIFI_SERVICE);
                String ip = Formatter.formatIpAddress(wm.getConnectionInfo().getIpAddress());
                Collections = ip;

            } catch (Exception e) {
                Collections = e.getLocalizedMessage();
            }


            return Collections;
        }

        @Override
        protected void onPostExecute(String result) {
            //if you started progress dialog dismiss it here
            Toast.makeText(getApplicationContext(), result, Toast.LENGTH_LONG).show();


        }
    }

}
