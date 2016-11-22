window.onload = function (){

new Vue({
    el: '#app',
    data: {
        message: 'Hey buddy'
    },
});

/*function showDiv(element){
    var el = "#" + element;
    console.log("pressing");
    document.getElementById(el).style.display = "Block";
}*/
function getEventTarget(e) {
    e = e || window.event;
    return e.target || e.srcElement; 
}

/*var p = document.getElementById('tournament');
p.onclick = function(event){
    console.log('pressed');
    var target = getEventTarget(event);
    alert(target.innerHTML);
}*/


var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
    if(xhr.readyState == XMLHttpRequest.DONE){
        //console.log(xhr.responseText);
        var jsonMatches = JSON.parse(xhr.responseText);
        console.log(jsonMatches.upcomingMatches);
        new Vue({
            el: '#upcomingMatches',
            data: {
                items: jsonMatches.upcomingMatches,
                show: true,
                openS: false
            },
            methods: {
                dateMe: function(ms){
                        x = ms;
                        var seconds = Math.floor(x % 60);
                        x /= 60;
                        var minutes = Math.floor(x % 60);
                        x /= 60;
                        var hours = Math.floor(x % 24);
                        x /= 24;
                        var days = Math.floor(x);
                        if (days == '' && hours == '') {
                            return minutes + ' Minutes, '  + seconds + ' Seconds';
                        } else if (days == '') {
                            return  hours + ' Hours, ' + minutes + ' Minutes';
                        } else {
                            return  days + ' Days, ' + hours + ' Hours, ' + minutes + ' Minutes';
                        }
                }
            }
            /*methods: {
                toggleMe: function(){
                    /*console.log(e.path);
                    e.path[1].classList.toggle("open");
                    e.path[1].children[1].classList.toggle("open");
                    console.log("toggling " + this.openS);
                    if(this.openS == true){
                        this.openS = false;
                    }else{
                        this.openS = true;
                    }
                }
            }*/
        });
        /*var acc = document.getElementsByClassName("accordion");
        var i;
        for (i = 0; i < acc.length; i++) {
        acc[i].onclick = function(){
            this.classList.toggle("active");
            this.nextElementSibling.classList.toggle("show");
        }
        }*/
	    var component = document.getElementsByClassName('accordion-item'),
	        heading = document.getElementsByClassName('accordion-content');
	    // Slide open the accordion content
        for(i=0; i < component.length; i++){

            component[i].onclick = function () {
                this.children[1].classList.toggle("open");
                this.classList.toggle('open');
            };
        }
    }
}
xhr.open("GET", "http://staging.pebble.mrwhal3.com/pebble/v1/FED/all");
xhr.send();


var apiURL = "http://staging.pebble.mrwhal3.com/pebble/v1/FED/all";


}



