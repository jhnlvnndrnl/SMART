using UnityEngine;

public class PlayerMovement : MonoBehaviour
{
    public float speed = 4f;
    public joystick Joystick;
    private Rigidbody2D rb;

    void Start()
    {
        rb = GetComponent<Rigidbody2D>();
    }

    void Update()
    {
        Vector2 move = new Vector2(Joystick.Horizontal, Joystick.Vertical);
        rb.linearVelocity = move * speed;
    }
}