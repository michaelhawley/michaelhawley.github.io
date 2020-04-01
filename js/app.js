$(document).foundation();

     
//Data
var map = "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson"
var airports = "https://rawgit.com/nvkelso/natural-earth-vector/master/geojson/ne_10m_airports.geojson"

//Colours
var colors = {
    fill: 'grey',
    border: 'white',
    sea: '#63FFA8',
    background: '#63FFA8'
    }

//initial config
var use_y = true
var config = {
    init_rot: [0,0,0],
}
var width = getWidth()
var height = getHeight()

var maxlat = 80

var xAdjust = 0
var yAdjust = 0
var projection = d3.geoMercator()
var path = ""

var pro = {
    rotate: [180,0,0],
    start: [0,0,0],
    useY: 1
}

function draw(data_input, sel,app, projection, fill, stroke){
    g.selectAll("path").remove();
    d3.json(map,function(data){                              
    g.selectAll(".countries")
        .data(data.features)
        .enter().append(app)
            .attr("fill", fill)    
            .attr("d", d3.geoPath()
                .projection(projection))
            .style("stroke", stroke)
        })
}

// find the left to right or top to bottom dimensions
function Bounds(p, x, y, xOrY) {  
    xymax = p([ x,-y ])
    xymin = p([-x, y ])

return (xymax[xOrY]-xymin[xOrY]);
}

function project(projection_type){
    projection_type = projection_type ||'geoMercator' 
    // [use_y, projection type , width or height, x, y, xOry]
    projection_prop = [1, d3.geoMercator(), width, 180, 0 ,0]
    switch (projection_type) {
        case 'geoMercator':
            projection_prop = [1, d3.geoMercator(), width+2, 180, 0 ,0]
            pro.rotate[1] = 0
            break;
        case 'geoAlbers':
            projection_prop = [1, d3.geoAlbers(), width, 90, 0 ,0]
            break;
        case 'geoEquirectangular': 
            console.log('geoEquirectangular')
            projection_prop = [1, d3.geoEquirectangular(), width, 180, 0 ,0]
            break;
        case 'geoOrthographic': 
            projection_prop = [0, d3.geoOrthographic(), height, 0, 90 ,1]
            break;
        case 'geoAzimuthalEquidistant': 
            projection_prop = [0, d3.geoAzimuthalEquidistant(), height, 0, 180,1 ]
    }
    
    pro.useY = projection_prop[0] // set the variable that determines whether to use the y-axis
    projection = projection_prop[1] // set the projection type
    projection.scale(1) // set the scale to 1 to get a reading of the base scale used
    dim = Bounds(projection,projection_prop[3], projection_prop[4] , projection_prop[5]) // get the width or height
    projection.scale(projection_prop[2]/dim);  // scale by screen widthheight / base scale widthheight
    
    return projection
}

// define functions
function make_projection(p){
    pro.start[0] = ((pro.rotate[0]+180)%360+360)%360-180  
    pro.start[1] = ((pro.rotate[1]+ 90)%180+180)%180 -90  
    svg.call(zoom.transform, d3.zoomIdentity);
    projection = project(projection_type = p) // set up the correct projection
    path = d3.geoPath().projection(projection);

    centerOfProjection = (projection([0,0]))
    xAdjust = width/2 - centerOfProjection[0]
    yAdjust = height/2 - centerOfProjection[1]
    projection.rotate(pro.start)
    g.attr('transform', 'translate('+(xAdjust)+','+yAdjust + ')')
    redraw()
}

function zoomed(p){
    
    var transform = d3.event.transform; // get the zoom behaviour
    // calculate the rotation ratio for a less dramatic zoom
    ratio = 1      
    k = ((transform.k-1) *ratio)+1
    t_width = (width) * k
    t_height = (height) * k
    if (pro.useY == 1){
        g.attr('transform', 'translate(' + (xAdjust*k)  + ', ' +(yAdjust*k + transform.y*ratio*pro.useY) + ') scale(' + k + ')')
        pro.rotate[0] = transform.x/(t_width)*ratio*360 +pro.start[0]
    }
    else{
        g.attr('transform', 'translate(' + (xAdjust*(3-2*k))  + ', ' + (yAdjust*(2-1*k)) + ') scale(' + k + ')')
        pro.rotate[0] =   transform.x/(t_width) *360 - 180/k +180 + pro.start[0]
        pro.rotate[1] =  -transform.y/(t_height)*180 + 90/k  -90 + pro.start[1]
    } 

    projection.rotate(pro.rotate)
    g.selectAll("path").attr("d", path);
}

function redraw(){
    draw(data_input = map, sel = ".countries" ,app = "path", projection = projection, fill = colors.fill , stroke = colors.border)
}
function redraw2(){
    draw2(data_input = map, sel = ".countries" ,app = "path", projection = projection, fill = colors.fill , stroke = colors.border)
}
function redraw_border(jscolor) {
    colors.border = "#" +  jscolor
    redraw()
}
function redraw_colors(jscolor) {
    colors.fill = "#" +  jscolor
    redraw()
}
function redraw_sea(jscolor) {
    colors.sea = "#" +  jscolor
    redraw()
}
function redraw_background(jscolor) {
    document.getElementById("chart").style.backgroundColor = "#" +  jscolor;
}

function getHeight(){
    console.log(document.getElementById('chart').clientHeight)
    return document.getElementById('chart').clientHeight;
}

function getWidth(){
    var s = document.getElementsByClassName('content map')[0];
    var rect = s.getBoundingClientRect();
    return rect.width;
}