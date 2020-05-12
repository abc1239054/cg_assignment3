// Fragment shader
#version 150

in vec3 normal;
in vec3 light_dir;
in vec3 eye;
uniform vec4 ambient = vec4(0.5, 0.0, 0.0, 1.0);
uniform vec4 diffuse_color = vec4(0.5, 0.0, 0.0, 1.0);
uniform vec4 specular_color = vec4(1.0, 1.0, 1.0, 1.0);
uniform float specular_power = 16.0;





out vec4 frag_color;

void main()
{
    vec3 l = normalize(light_dir);
    vec3 n = normalize(normal);
    vec3 e = normalize(eye);

    float lambertian = max(dot(l, n), 0.0);
    vec4 diffuse = lambertian * diffuse_color;

    vec4 specular = vec4(0.0);

    if (lambertian > 0.0) {
        vec3 h = normalize(l + e);
        specular = specular_color * pow(max(dot(h, n), 0.0), specular_power);
    }
    
    vec4 calibrated_color = pow(ambient + diffuse + specular, vec4(1.0 / 2.2, 1.0 / 2.2, 1.0 / 2.2, 1.0));
    frag_color = calibrated_color;

}
