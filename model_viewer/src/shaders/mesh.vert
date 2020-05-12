// Vertex shader
#version 150
#extension GL_ARB_explicit_attrib_location : require

layout(location = 0) in vec4 a_position;
layout(location = 1) in vec3 a_normal;

uniform vec3 u_light_position = vec3(1.0, 1.0, 1.0); // The position of the light source
uniform mat4 u_mv;
uniform mat4 u_mvp;

out vec3 normal;
out vec3 light_dir;
out vec3 eye;


void main()
{

    // Calculate the view-space position 
    vec3 position = vec3(u_mv * a_position);

    // Calculate the view-space normal
    normal = vec3(u_mv * vec4(a_normal, 0.0));

    // Calculate the view-space light direction
    light_dir = u_light_position - position;

    // Calculate the vector to viewer's eye
    eye = -position;

    gl_Position = u_mvp * a_position;
}
