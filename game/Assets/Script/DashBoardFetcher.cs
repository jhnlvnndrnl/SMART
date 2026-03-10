using System.Collections;
using UnityEngine;
using UnityEngine.Networking;
using TMPro;
using Newtonsoft.Json; // <-- Use Newtonsoft

public class DashboardFetcher : MonoBehaviour
{
    public string apiURL = "http://192.168.1.12:8000/status/latest"; // Use LAN IP
    public TextMeshProUGUI sensorText;

    void Start()
    {
        StartCoroutine(GetStatusData());
    }

    IEnumerator GetStatusData()
    {
        UnityWebRequest request = UnityWebRequest.Get(apiURL);
        yield return request.SendWebRequest();

        if (request.result == UnityWebRequest.Result.Success)
        {
            string json = request.downloadHandler.text;
            Debug.Log("API Response: " + json);

            try
            {
                // Deserialize JSON safely
                StatusData data = JsonConvert.DeserializeObject<StatusData>(json);

                if (data != null)
                {
                    sensorText.text =
                        "Status: " + data.overall_status + "\n" +
                        "Weather: " + data.weather + "\n" +
                        "Alert: " + (string.IsNullOrEmpty(data.alert) ? "None" : data.alert) + "\n" +
                        "Time: " + data.created_at;
                }
            }
            catch (System.Exception e)
            {
                Debug.LogError("JSON Parsing Error: " + e.Message);
            }
        }
        else
        {
            Debug.LogError("API Error: " + request.error);
        }
    }
}

[System.Serializable]
public class StatusData
{
    public string overall_status;
    public string alert; // can be null
    public string weather;
    public string created_at;
    public int id;
    public int? fkid; // Optional, matches JSON field
}