precision mediump float;

varying float vY;

void main()
{
    gl_FragColor = vec4(0.7 * (vY / 2.0), 0.6 * sqrt(sqrt(vY)), 0.5 * (vY / 2.0), 1.0);
}