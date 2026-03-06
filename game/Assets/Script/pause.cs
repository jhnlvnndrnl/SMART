using UnityEngine;

public class Pause : MonoBehaviour
{
    public GameObject pause; // Drag PausePopUp Panel dito
    private bool isPaused = false;

    void Update()
    {
        // ESC key toggle
        if (Input.GetKeyDown(KeyCode.Escape))
        {
            TogglePause();
        }
    }

    public void TogglePause()
    {
        isPaused = !isPaused;
        pause.SetActive(isPaused);

        // Stop/resume game time
        Time.timeScale = isPaused ? 0f : 1f;
    }

    public void Resume()
    {
        isPaused = false;
        pause.SetActive(false);
        Time.timeScale = 1f;
    }
}