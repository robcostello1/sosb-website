precision mediump float;

uniform vec3 uColor;
uniform sampler2D uTexture;

// varying vec2 vUv;
// varying float vElevation;

void main()
{
    vec4 textureColor = vec4(0.1, 0.3, 0.1, 1.0);
    // textureColor.xyz *= vElevation / 50.0;
    gl_FragColor = textureColor;
}