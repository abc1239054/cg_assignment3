// Vertex shader
#version 330
#extension GL_ARB_explicit_attrib_location : require

layout(location = 0) in vec4 a_position;
layout(location = 1) in vec3 a_normal;

uniform vec3 light_position; // The position of the light source
uniform mat4 u_mv;
uniform mat4 u_mvp;

out vec3 normal;
out vec3 light_dir;
out vec3 eye;
out vec3 v_normal;

void main()
{
    v_normal = a_normal;


    // Calculate the view-space position 
    vec3 position = vec3(u_mv * a_position);

    // Calculate the view-space normal
    normal = vec3(u_mv * vec4(a_normal, 0.0));

    // Calculate the view-space light direction
    light_dir = light_position - position;

    // Calculate the vector to viewer's eye
    eye = -position;

    gl_Position = u_mvp * a_position;
}
