// FLOW
/*

  --Entry point v1 (dev)

    1. GET door.enter (true or false) value on SUPABASE
    2. If it is set manually "TRUE"...
    3. All the hardware will RUN and get DATA
    4. It will all upload in the SUPABASE
    5. Then set the DOOR to "FALSE" again.


*/









// WIFI
#include <WiFiS3.h>
const char* ssid = "azk4";
const char* password = "12345678";
char server[] = "arsenal-core.vercel.app";
WiFiSSLClient client;

// DHT11
#include <DHT.h>
#define DHTPIN 0       // Pin where DHT11 DATA is connected
#define DHTTYPE DHT11  // Sensor type
DHT dht(DHTPIN, DHTTYPE);

// SOIL SENSOR
int sensorPin = A0;


// DOT MATRIX
#include "Arduino_LED_Matrix.h"
ArduinoLEDMatrix matrix;


// VARIABLE
float humidity = 0.0;
float temperature = 0.0;
int sensorValue = 0;
String door = "";  


// ------------------------- ASSETS
uint8_t phase_on[8][12] = {
{0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0},
{0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0},
{0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0},
{0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0},
{0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0},
{0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0},
{0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0},
{0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0} 
};

uint8_t phase_wifi_connecting[8][12] = {
{0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0},
{0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0},
{0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0},
{0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0},
{0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0},
{0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0},
{0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0},
{0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0} 
};


uint8_t phase_wifi_connected[8][12] = {
{0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0},
{0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0},
{0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0},
{0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0},
{0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0},
{0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0},
{0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0},
{0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0} 
};

uint8_t phase_setup_complete[8][12] = {
{0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0},
{0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0},
{0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0},
{0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0},
{0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0},
{0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0},
{0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0},
{0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0} 
};

uint8_t tick_1[8][12] = {
{0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0},
{0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0},
{0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0},
{0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0},
{0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0},
{0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0},
{0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0},
{0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0} 
};
uint8_t tick_2[8][12] = {
{0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0},
{0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0},
{0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0},
{0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0},
{0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0},
{0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0},
{0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0},
{0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0} 
};
uint8_t tick_3[8][12] = {
{0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0},
{0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 0, 0},
{0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 0, 0},
{0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0},
{0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0},
{0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0},
{0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0},
{0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0} 
};

uint8_t tick_4[8][12] = {
{0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0},
{0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1},
{0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1},
{0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0},
{0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0},
{0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0},
{0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0},
{0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0} 
};










void setup() {
  
  Serial.begin(9600);
  matrix.begin();
  pinMode(1,OUTPUT);
  pinMode(2,OUTPUT);
  pinMode(3,OUTPUT);
  pinMode(4,OUTPUT);
  
  // -- WIFI SETUP
    matrix.renderBitmap(phase_wifi_connecting, 8, 12); 
  Serial.println("Connecting to WiFi...");
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting...");
  }

    matrix.renderBitmap(phase_wifi_connected, 8, 12); 
  Serial.println("Connected!");


  // -- DHT11 SETUP
  dht.begin();

    matrix.renderBitmap(phase_setup_complete, 8, 12);
  delay(3000);
}













void loop() {
  
  digitalWrite(1, LOW);
  digitalWrite(2, LOW);
  digitalWrite(3, LOW);
  digitalWrite(4, LOW);

    matrix.renderBitmap(tick_1, 8, 12); 
    digitalWrite(1, HIGH);
  get_door();
    matrix.renderBitmap(tick_2, 8, 12); 
    digitalWrite(2, HIGH);
                Serial.println("   --"+ String(door));

  if(door == "true"){
    dht11();
    soil_sensor();
      matrix.renderBitmap(tick_3, 8, 12); 
      digitalWrite(3, HIGH);

    upload_db();
      matrix.renderBitmap(tick_4, 8, 12); 
      digitalWrite(4, HIGH);
    
      // close_door();
  }
  delay(5000);
}



// ------------------------------------   METHODS   ------------------------------------

// -- ENTRY DOOR
void get_door() {
    if (WiFi.status() == WL_CONNECTED) {
        if (client.connect(server, 443)) {   // HTTPS port

            client.println("GET /api/smart_door?func=1 HTTP/1.1");
            client.println("Host: arsenal-core.vercel.app");
            client.println("Connection: close");
            client.println(); // end of headers

            String response = "";
            // Read response
            while (client.connected()) {
                while (client.available()) {
                    char c = client.read();
                    response += c;   // build full response string
                }
            }

            client.stop();

            // Parse "enter" value from response
            int enterIndex = response.indexOf("\"enter\":");
            if (enterIndex != -1) {
                int start = enterIndex + 8; // length of '"enter":'
                int end = response.indexOf(",", start);
                if (end == -1) end = response.indexOf("}", start); // if it's last item
                String enterValue = response.substring(start, end);
                enterValue.trim();
                door = String(enterValue);  // assign to global variable
                Serial.println("   --"+ String(door));
            }

        }
    }

}

void close_door() {
    if (WiFi.status() == WL_CONNECTED) {
        if (client.connect(server, 443)) {   // HTTPS port

            client.println("GET /api/smart_door?func=0 HTTP/1.1");
            client.println("Host: arsenal-core.vercel.app");
            client.println("Connection: close");
            client.println(); // end of headers

            String response = "";
            // Read response
            while (client.connected()) {
                while (client.available()) {
                    char c = client.read();
                    response += c;   // build full response string
                }
            }

            client.stop();

        }

    }
}


// -- PUSH
void upload_db(){
  
    if (WiFi.status() == WL_CONNECTED) {

    Serial.println("Sending request...");

    if (client.connect(server, 443)) {   // HTTPS port
      client.println("GET /api/smart_proto1?soil_meter=" + String(sensorValue) + "&humidity=" + String(humidity) + "&temperature=" + String(temperature) + " HTTP/1.1");
    
      client.println("Host: arsenal-core.vercel.app");
      client.println("Connection: close");
      client.println(); // VERY IMPORTANT (end of headers)


      // Read response
      while (client.connected()) {
        while (client.available()) {
          char c = client.read();
          Serial.print(c);
        }
      }
      
      client.stop();
      Serial.println("\nDisconnected.");
    } else {
      Serial.println("Connection failed!");
    }
    matrix.renderBitmap(tick_2, 8, 12);

  }

  
    matrix.renderBitmap(tick_3, 8, 12);
    delay(1000);
}


// -- GET HARDWARE
void dht11(){
  humidity = dht.readHumidity();       // Read humidity
  temperature = dht.readTemperature(); // Read temperature in Celsius

  if (isnan(humidity) || isnan(temperature)) { // Check for reading errors
    Serial.println("Failed to read from DHT sensor!");
    temperature = -1.0;
    humidity = -1.0;
  } else {
    Serial.print("temp : ");
    Serial.print(temperature);
    Serial.print(" °C ___ ");
    Serial.print("humid : ");
    Serial.print(humidity);
    Serial.print("% ___ ");
  }

}

void soil_sensor(){
  sensorValue = analogRead(sensorPin);
  Serial.print("soil_moist : ");
  Serial.println(sensorValue);
}















