window.onload = function (){


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
                openS: false,
                searchKey: '',
                currentPage: 1,
                itemsPerPage: 10,
                resultCount: 10
            },
            methods: {
                dateMe: function(ms){
                    return millisToTime(ms);
                },
                setPage: function(pageNumber) {
                    this.currentPage = pageNumber  
                }
            },
            computed: {
                totalPages: function() {
                    return Math.ceil(this.resultCount / this.itemsPerPage)
                }
            },
            filters: {
                paginate: function(list) {
                    this.resultCount = list.length
                    if (this.currentPage >= this.totalPages) {
                        this.currentPage = this.totalPages - 1
                    }
                    var index = this.currentPage * this.itemsPerPage
                    console.log("doing paginate clicks");
                    return list.slice(index, index + this.itemsPerPage)
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
        new Vue({
            el: '#liveMatches',
            data: {
                items: jsonMatches.liveMatches,
                show: true,
                openS: false
            },
            methods: {
                dateMe: function(ms){
                    return millisToTime(ms);
                }
            }
        });
        new Vue({
            el: '#completedMatches',
            data: {
                items: jsonMatches.completedMatches,
                show: true,
                openS: false
            },
            methods: {
                dateMe: function(ms){
                    return millisToTime(ms);
                }
            }
        });
        /*var acc = document.getElementsByClassName("accordion");
        var i;
        for (i = 0; i < acc.length; i++) {
        acc[i].onclick = function(){
            this.classList.toggle("active");
            this.nextElementSibling.classList.toggle("show");
        }
        }*/
        makeClick();
    }
}
xhr.open("GET", "http://staging.pebble.mrwhal3.com/pebble/v1/FED/all");
xhr.send();


var apiURL = "http://staging.pebble.mrwhal3.com/pebble/v1/FED/all";

}

function makeClick(){
    	var component = document.getElementsByClassName('accordion-item')
	    var heading = document.getElementsByClassName('accordion-content');
	    // Slide open the accordion content
        for(i=0; i < component.length; i++){
            component[i].addEventListener('click', function(e){
                 console.log("shiiiet");
                 console.log(e);
                 this.classlist.toggle("open");
                 //component[i].children.classlist.toggle("open");
                }, false); 
           /* component[i].onclick = function () {
                this.children[1].classList.toggle("open");
                this.classList.toggle('open');
            };*/
        }
}
function millisToTime(ms) {
    x = ms
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



