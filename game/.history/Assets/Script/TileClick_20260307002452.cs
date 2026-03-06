using UnityEngine;
using UnityEngine.Tilemaps;

public class TileClick : MonoBehaviour
{
    public Tilemap tilemap;

    void Update()
    {
        if (Input.GetMouseButtonDown(0))
        {
            Vector3 worldPos = Camera.main.ScreenToWorldPoint(Input.mousePosition);
            Vector3Int cell = tilemap.WorldToCell(worldPos);

            Debug.Log("Clicked tile: " + cell);
        }
    }
}