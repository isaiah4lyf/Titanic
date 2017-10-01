package com.example.isaia.titanic_navigation_server;

import android.widget.TextView;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.net.Socket;
import java.util.Scanner;

/**
 * Created by isaia on 10/1/2017.
 */




public class Server_Class implements Runnable {
    private Socket newConnectionToClient;
    private OutputStream os;
    private BufferedInputStream is;
    private PrintWriter txtout;
    private PrintWriter usersOut;
    private Scanner userFileScanner;
    private BufferedReader txtin;
    private FileWriter logFile;
    private FileReader readFile;
    private File log;
    private TextView text;

    public Server_Class(Socket newConnectionToClient, TextView text) {
        // Bind Streams
        this.newConnectionToClient = newConnectionToClient;
        this.text = text;

        try {
            os = newConnectionToClient.getOutputStream();
            is = new BufferedInputStream(newConnectionToClient.getInputStream());


            txtin = new BufferedReader(new InputStreamReader(newConnectionToClient.getInputStream()));
            txtout = new PrintWriter(os);

        } catch (IOException ex) {
            ex.printStackTrace();
        }

    }

    @Override
    public void run() {
        //	Process commands from client

        boolean processing = true;
        String name = "";
        text.setText("Heyy");
        /*
        try {
            while (processing) {
                String message = txtin.readLine();
                text.setText("Heyy");
                //Toast.makeText(getApplicationContext(),result, Toast.LENGTH_LONG).show();

            }
        } catch (IOException ex) {
            // TODO Auto-generated catch block
            ex.printStackTrace();
        } finally {

            try {
                newConnectionToClient.close();
            } catch (IOException ex) {
                ex.printStackTrace();
            }

        }
        */
    }
    private void sendResponse(String response)
    {
        //	Send response to client
        txtout.println(response);
        txtout.flush();
    }
}