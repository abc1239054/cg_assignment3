// Fragment shader
#version 150


varying vec3 normal;
varying vec3 light_dir;
varying vec3 eye;
varying vec3 v_normal;

uniform vec4 ambient;
uniform vec4 diffuse_color;
uniform vec4 specular_color;

uniform float specular_power;
uniform vec4 light_color;

uniform bool enable_gamma;
uniform bool show_normal;


out vec4 frag_color;

void main()
{
    vec3 l = normalize(light_dir);
    vec3 n = normalize(normal);
    vec3 e = normalize(eye);

    float lambertian = max(dot(l, n), 0.0);
    vec4 diffuse = lambertian * diffuse_color * light_color;

    vec4 specular = vec4(0.0);

    if (lambertian > 0.0) {
        vec3 h = normalize(l + e);
        specular = specular_color * pow(max(dot(h, n), 0.0), specular_power) * light_color;
    }

    vec4 color;
    vec4 clibrated_color;

    if (show_normal) {
        color = vec4(v_normal, 1.0)*0.5+0.5;
    }

    else {
        color = ambient + diffuse + specular;
    }


    if (enable_gamma) {
        clibrated_color = pow(color, vec4(1.0 / 2.2, 1.0 / 2.2, 1.0 / 2.2, 1.0));
    } 
    else {
        clibrated_color = color;
    }

    frag_color = clibrated_color;

}
