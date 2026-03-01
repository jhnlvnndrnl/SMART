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
int sensorValue = 0;










void setup() {
  
  Serial.begin(9600);
  
  // -- WIFI SETUP
  Serial.println("Connecting to WiFi...");
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting...");
  }
  
  Serial.println("Connected!");


  // -- DHT11 SETUP
  dht.begin();

}













void loop() {
  
  delay(10000);
}



// ------------------------------------   METHODS   ------------------------------------
void upload_db(){
    if (WiFi.status() == WL_CONNECTED) {

    Serial.println("Sending request...");

    if (client.connect(server, 443)) {   // HTTPS port

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
  }
}


void dht11(){
  float humidity = dht.readHumidity();       // Read humidity
  float temperature = dht.readTemperature(); // Read temperature in Celsius

  if (isnan(humidity) || isnan(temperature)) { // Check for reading errors
    Serial.println("Failed to read from DHT sensor!");
  } else {
    Serial.print("Temperature: ");
    Serial.print(temperature);
    Serial.print(" °C, ");
    Serial.print("Humidity: ");
    Serial.print(humidity);
    Serial.print("%");
  }

}

void soil_sensor(){
  sensorValue = analogRead(sensorPin);
  Serial.print("  Soil Moisture : ");
  Serial.println(sensorValue);
}