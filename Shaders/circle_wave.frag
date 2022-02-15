float PI=3.14159;float sq(float x){return x*x;}float hypot(vec2 p){return sqrt(sq(p.r)+sq(p.g));}float dist(vec2 p1,vec2 p2){return hypot(p2-p1);}float angle(vec2 p){return atan(p.g,p.r);}float angle_between(vec2 p1,vec2 p2){return atan(p2.g-p1.g,p2.r-p1.r);}float pml(float x,float a,float b){float t=abs(b-a);return mod(-x*sign(mod(floor(x/t),2.0)-0.5),t)+a;}vec2 ptc(float d,float a){return vec2(d*cos(a),d*sin(a));}vec3 rgb2hsv(vec3 c){vec4 K=vec4(0.0,-1.0/3.0,2.0/3.0,-1.0),p=mix(vec4(c.bg,K.ab),vec4(c.gb,K.rg),step(c.b,c.g)),q=mix(vec4(p.rga,c.r),vec4(c.r,p.gbr),step(p.r,c.r));float d=q.r-min(q.a,q.g),e=1e-10;return vec3(abs(q.b+(q.a-q.g)/(6.0*d+e)),d/(q.r+e),q.r);}vec3 hsv2rgb(vec3 c){vec4 K=vec4(1.0,0.66666,0.33333,3.0);vec3 p=abs(fract(c.rrr+K.rgb)*6.0-K.aaa);return c.b*mix(K.rrr,p-K.rrr,c.g);}

void mainImage( out vec4 fragColor, in vec2 fragCoord ) {
    vec2 l = (fragCoord-iResolution.xy*0.5)/iResolution.y*1.0;
    
    float time = iTime / 2.0;
    float bk = 0.1;
    float d = hypot(l);
    float ua = atan(l.y, l.x);
    float a = PI + ua + 1.65 * time;
    float j = 2.0 * a;
    float q2 = cos(a + 1.5 * time);
    float m = sin(j) / (120.0 + 50.0 * (1.0 + sin(time / 2.0)));
    float c1_p = d - 0.33;
    float mm = 1.5 + pow(1.0 + sin(1.0 * a + time), 2.0) / 1.0;
    float v = (
        pow(
            abs(mm * c1_p * (
                25.0 + 1.0 * (q2 + 1.0)
            ) + m * (
                7.5 * cos(time / 1.5)
            )),
            1.05
        )
    );
    // / (0.9 + 0.1 * sq(sin(7.0 * ua - time)))
    float q = max(
        bk * min(1.0, max(d - 0.2, 0.0)),
        3.0 * (0.93 - pow(abs(v), 0.75))
    );
    
    float h = a / PI;
    float s = 0.6 * (1.0 - pow(max(0.0, q - 1.5), 1.2 + q2 + 1.0));
    float b = pow(q, 0.85);
    vec3 color = hsv2rgb(vec3(0.5 * h, s, b));
    
    fragColor = vec4(color, 1.0);
}
