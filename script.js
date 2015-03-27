HTMLElement.prototype.toggleCssClass = function(name) //Man borde inte göra så här, men det är kul :D
{
    var s = "(?:^|\\s)"+name+"(?!\\S)";
    var regexp = new RegExp(s,"g");    // /(?:^|\s)name(?!\S)/g
    if (this.className.match(regexp))
    {
        this.className = this.className.replace(regexp,"");
    }
    else
    {
        this.className += " " + name;
    }
};

HTMLElement.prototype.hasCssClass = function(name)     //Åter igen... Ajabaja ehehe
{
    var s = "(?:^|\\s)"+name+"(?!\\S)";
    var regexp = new RegExp(s,"g");    // /(?:^|\s)name(?!\S)/g
    return this.className.match(regexp);
};

function toggleContent(e)
{
    if (e.hasCssClass("closed"))
    {
        expandStoryContent();
    }
    else
    {
        collapseStoryContent();
    }
    e.toggleCssClass("open");
    e.toggleCssClass("closed");
}

function expandStoryContent()
{
    var content = document.getElementById("story").getElementsByClassName("collapseable");
    for(var i = 0; i<content.length; i++)
    {
        var c = content[i];
        var delay = 0.3*(i);
        expandCollapseable(c,delay);
    }
}

function expandCollapseable(c,delay)
{
    c.style.transition =    "opacity 0.5s ease "+(delay + 0.2)+
                                "s, left 0.2s ease "+(delay + 0.2)+
                                "s, max-height 0.3s ease "+delay+"s,"+
                                " visibility 0.5s ease "+delay+"s";
    c.style.opacity = "1";
    c.style.left = "0px";
    c.style.visibility = "visible";
    c.style.maxHeight = c.scrollHeight+"px";
}

function collapseStoryContent()
{
    var content = document.getElementById("story").getElementsByClassName("collapseable");
    for(var i = 0; i<content.length; i++)
    {
        var c = content[i];
        var delay = 0.2*(i);
        c.style.transition =    "opacity 0.2s ease "+delay+
                                "s, left 0.2s ease "+delay+
                                "s, max-height 0.2s ease "+(delay + 0.2)+"s,"+
                                " visibility 0.2s ease "+(delay + 0.2)+"s";
        c.style.opacity = "0";
        c.style.left = "50px";
        c.style.visibility = "hidden";
        c.style.maxHeight = "0px";
    }
}

var interval = setInterval(function() {
    if (document.readyState == "complete")
    {
        var path = window.location.href;
        var scrollId = /#(.+?(?=&|$))/.exec(path);
        if (scrollId)
            scrollId = scrollId[1];
        else
            return;
        var element = document.getElementById(scrollId);
        if (element!==null)
        {
            var exp = element;
            do {
                if (exp.className == "collapseable")
                    expandCollapseable(exp,0.1);
            }
            while (exp = exp.parentElement)
            
            var top = 0;
            do {
                top += element.offsetTop;
            } while (element = element.offsetParent);
            window.scrollTo(0,top);
        }
        
        clearInterval(interval);
    }
},20);