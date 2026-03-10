# SMART – Sustainable Monitoring and Agricultural Resource Technology

SMART is a smart agriculture system developed during a hackathon to support data-driven rice farming. The system integrates IoT sensors, rule-based environmental analysis, artificial intelligence, and interactive visualization to help farmers monitor crop conditions and make informed agricultural decisions.

Rice farmers often rely on manual observation and experience to monitor crop health. However, environmental factors such as soil moisture, temperature, humidity, and weather conditions significantly influence rice growth. Without continuous monitoring tools, problems may be detected too late, resulting in reduced crop yield and economic loss.

SMART addresses this problem by providing real-time environmental monitoring, crop health analysis, and an interactive visualization platform that allows farmers to observe farm conditions and respond to potential issues earlier.

The project aligns with digital agriculture initiatives promoted by the International Rice Research Institute (IRRI), which encourages the use of technology and precision farming methods to improve agricultural productivity.

---
# Features

## Dashboard Monitoring
Displays crop health indicators, environmental conditions, and IoT sensor readings through a centralized monitoring interface.

## IoT Environmental Monitoring
Sensors deployed in the field collect real-time environmental data including:

- Soil moisture  
- Temperature  
- Humidity  
- Environmental conditions affecting crop growth  

## Rule-Based Environmental Analysis
Sensor readings are compared with standard environmental ranges required for healthy rice crop growth to detect unfavorable conditions early.

## AI Crop Disease Detection
Artificial intelligence analyzes crop images to detect possible plant diseases or abnormalities.

## Gamified Farm Visualization
A Unity-based application presents farm data through an interactive environment where farmers can visualize crop conditions and farm status.

## User Authentication
Provides secure login and access control for users of the monitoring platform.

---
# System Architecture

       +--------------------+
       |     IoT Sensors    |
       |--------------------|
       | Soil Moisture      |
       | Temperature        |
       | Humidity           |
       +---------+----------+
                 |
                 v
    +----------------------------+
    | Rule-Based Environmental   |
    | Analysis                   |
    |----------------------------|
    | Compare sensor values with |
    | standard crop conditions   |
    +------------+---------------+
                 |
                 v
       +-------------------+
       |   Supabase DB     |
       |-------------------|
       | Sensor Data       |
       | Farm Records      |
       +---------+---------+
                 |
                 v
      +----------------------+
      |     n8n Automation   |
      |----------------------|
      | Data Processing      |
      | Workflow Triggers    |
      +----------+-----------+
                 |
                 v
    +---------------------------+
    | Artificial Intelligence   |
    |---------------------------|
    | Crop Disease Detection    |
    | Image Analysis            |
    +------------+--------------+
                 |
                 v
       +--------------------+
       | Unity Dashboard    |
       |--------------------|
       | Gamified Farm View |
       | Data Visualization |
       +--------------------+

## Data Flow

1. **IoT Sensors** collect environmental data from the rice field such as soil moisture, temperature, and humidity.

2. The data is processed through a **rule-based environmental analysis** that compares the collected values with recommended environmental ranges for healthy rice crop growth.

3. The processed data is stored in the **Supabase database**, which acts as the central backend for the system.

4. **n8n automation workflows** manage data processing, triggers, and system alerts.

5. **Artificial intelligence models** analyze crop images to detect potential plant diseases and abnormalities.

6. The results are presented in the **Unity-based monitoring dashboard**, where farmers can interact with the farm data through a gamified visualization environment.

## Key Components

### IoT Layer
Responsible for collecting environmental data directly from the field using sensors.

### Processing Layer
Handles rule-based analysis and data validation to determine whether environmental conditions are within optimal ranges.

### Data Layer
Supabase stores environmental data, crop health results, and system information.

### Automation Layer
n8n automates system workflows, triggers alerts, and manages backend processes.

### Application Layer
Unity provides the user interface where farmers can monitor farm conditions and visualize crop health.

---  
# Contact  
  
For questions, collaboration, or feedback about the SMART project, you may contact the project maintainer.  

```
John Elvin Endrenal
GitHub: https://github.com/jhnlvnndrnl
Email: jeendrenal.dev@gmail.com
```