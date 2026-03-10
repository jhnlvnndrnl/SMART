using UnityEngine;
using UnityEngine.Tilemaps;

public class TileClick : MonoBehaviour
{
    public Tilemap tilemap;      
    public GameObject dialogue; 
    public GameObject sensortext;

    void Update()
    {
        // Check ESC first
        if (Input.GetKeyDown(KeyCode.Escape))
        {
            if (dialogue != null)
                dialogue.SetActive(false); // hide dialogue

            if (sensortext != null)
                sensortext.SetActive(false);

            
        }

        // Mouse click
        if (Input.GetMouseButtonDown(0))
        {
            if (tilemap == null) return;

            Vector3 worldPos = Camera.main.ScreenToWorldPoint(Input.mousePosition);
            worldPos.z = 0f; 
            Vector3Int cell = tilemap.WorldToCell(worldPos);

            if (tilemap.HasTile(cell))
            {
                if (dialogue != null)
                    dialogue.SetActive(true);

                if (sensortext != null)
                    sensortext.SetActive(true);
            }
        }
    }
}