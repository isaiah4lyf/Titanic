package com.example.isaia.titanic_navigation;

import android.Manifest;
import android.content.pm.PackageManager;
import android.graphics.Color;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.os.AsyncTask;
import android.os.Bundle;
import android.support.v4.app.ActivityCompat;
import android.support.v4.app.FragmentActivity;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.OnMapReadyCallback;
import com.google.android.gms.maps.SupportMapFragment;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.MarkerOptions;
import com.google.android.gms.maps.model.Polyline;
import com.google.android.gms.maps.model.PolylineOptions;

import org.ksoap2.SoapEnvelope;
import org.ksoap2.serialization.SoapObject;
import org.ksoap2.serialization.SoapPrimitive;
import org.ksoap2.serialization.SoapSerializationEnvelope;
import org.ksoap2.transport.HttpTransportSE;

import java.io.BufferedOutputStream;
import java.io.BufferedReader;
import java.io.InputStream;
import java.io.PrintWriter;
import java.net.Socket;
import java.util.ArrayList;

public class MapsActivity extends FragmentActivity implements OnMapReadyCallback {

    private GoogleMap mMap;
    private LocationManager locationManager;
    private LocationListener locationListener;
    private TextView speed;
    private ArrayList<LatLng> points; //added
    Polyline line; //added


    private Socket connectionSocket;
    public BufferedOutputStream os;
    private InputStream is;
    private PrintWriter txtout;
    private BufferedReader txtin;
    private EditText editText;
    private EditText lat;
    private EditText lng;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_maps);
        // Obtain the SupportMapFragment and get notified when the map is ready to be used.
        SupportMapFragment mapFragment = (SupportMapFragment) getSupportFragmentManager()
                .findFragmentById(R.id.map);
        mapFragment.getMapAsync(this);
        points = new ArrayList<LatLng>(); //added
        speed = (TextView)findViewById(R.id.text);

    }

    /**
     * Manipulates the map once available.
     * This callback is triggered when the map is ready to be used.
     * This is where we can add markers or lines, add listeners or move the camera. In this case,
     * we just add a marker near Sydney, Australia.
     * If Google Play services is not installed on the device, the user will be prompted to install
     * it inside the SupportMapFragment. This method will only be triggered once the user has
     * installed Google Play services and returned to the app.
     */
    @Override
    public void onMapReady(GoogleMap googleMap) {
        mMap = googleMap;

        locationManager = (LocationManager) getSystemService(LOCATION_SERVICE);
        locationListener = new LocationListener() {
            @Override
            public void onStatusChanged(String provider, int status, Bundle extras) {

            }

            @Override
            public void onProviderEnabled(String provider) {

            }

            @Override
            public void onProviderDisabled(String provider) {

            }

            @Override
            public void onLocationChanged(Location location) {



                try
                {
                    String speedF = String.valueOf((location.getSpeed()*3600)/1000);
                    String bearing = String.valueOf(location.getBearing());
                    speed.setText(speedF + "");
                    double latitude = location.getLatitude();
                    double longitude = location.getLongitude();
                    LatLng latLng = new LatLng(latitude, longitude); //you already have this


                    points.add(latLng); //added
                    mMap.moveCamera( CameraUpdateFactory.newLatLngZoom(new LatLng(latitude, longitude) ,20) );
                    redrawLine(latitude,longitude); //added

                    Forwad_Speed tt = new Forwad_Speed();
                    tt.execute(new String[]{speedF});


                    Forward_Coordinates tas = new Forward_Coordinates();
                    tas.execute(new String[]{String.valueOf(latitude),String.valueOf(longitude)});
                }
                catch (Exception e)
                {
                    Toast.makeText(getApplicationContext(),e.toString(),Toast.LENGTH_LONG).show();
                }

            }

        };
        //speed.setText("isaiah");

        if (ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED && ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
            // TODO: Consider calling
            //    ActivityCompat#requestPermissions
            // here to request the missing permissions, and then overriding
            //   public void onRequestPermissionsResult(int requestCode, String[] permissions,
            //                                          int[] grantResults)
            // to handle the case where the user grants the permission. See the documentation
            // for ActivityCompat#requestPermissions for more details.
            return;
        }
        locationManager.requestLocationUpdates("gps", 5000, 0, locationListener);

        // Add a marker in Sydney and move the camera
        //LatLng sydney = new LatLng(-34, 151);
        //mMap.addMarker(new MarkerOptions().position(sydney).title("Marker in Sydney"));
        //mMap.moveCamera(CameraUpdateFactory.newLatLng(sydney));
        if (ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED && ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
            // TODO: Consider calling
            //    ActivityCompat#requestPermissions
            // here to request the missing permissions, and then overriding
            //   public void onRequestPermissionsResult(int requestCode, String[] permissions,
            //                                          int[] grantResults)
            // to handle the case where the user grants the permission. See the documentation
            // for ActivityCompat#requestPermissions for more details.
            return;
        }
        mMap.setMyLocationEnabled(false);
    }

    private void redrawLine(double latitude,double longitude){

        mMap.clear();  //clears all Markers and Polylines
        try
        {
            PolylineOptions options = new PolylineOptions().width(8).color(Color.BLUE).geodesic(true);
            for (int i = 0; i < points.size(); i++) {
                LatLng point = points.get(i);
                options.add(point);
            }
            LatLng latLng = new LatLng(latitude, longitude); //you already have this
            mMap.addMarker(new MarkerOptions().position(latLng).title("Current Location"));
            line = mMap.addPolyline(options); //add Polyline
        }
        catch (Exception e)
        {
            Toast.makeText(getApplicationContext(),e.toString(),Toast.LENGTH_LONG).show();
        }

    }






    private class Forward_Coordinates extends AsyncTask<String, Void, String> {

        @Override
        protected void onPreExecute() {
            //if you want, start progress dialog here
        }

        @Override
        protected String doInBackground(String... urls) {
            String Collections = "";


            try {
                final String NAMESPACE = "http://tempuri.org/";
                final String URL = "http://192.168.43.175/Titanic_Service/";
                //final String URL = "http://192.168.0.137/Titanic_Service/";
                final String SOAP_ACTION = "http://tempuri.org/Insert_Coordinates";
                final String METHOD_NAME = "Insert_Coordinates";
                SoapObject request = new SoapObject(NAMESPACE, METHOD_NAME);


                request.addProperty("lat", urls[0]);
                request.addProperty("lng", urls[1]);

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
                final String URL = "http://192.168.43.175/Titanic_Service/";
                //final String URL = "http://192.168.0.137/Titanic_Service/";
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
}
