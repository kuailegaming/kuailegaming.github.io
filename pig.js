var size=339;
var num=300;
var currentParent1=1;
var currentParent2=2;
var nextGen=3;
var re=null;
var list;
$.getJSON("http://klgaming.ngrok.xiaomiqiu.cn/listen/?fetch=hahaha",
    function (data)
    {
        var i = document.getElementsByClassName("i");
        var g = document.getElementsByClassName("g");
        var d = document.getElementsByClassName("d");
        for (var k=0;k<i.length;k++)
        {
            if (data[k]!=undefined)
            {
                i[k].innerHTML = data[k].name;
                g[k].innerHTML = data[k].gen+"代";
                d[k].innerHTML = data[k].time;
            }
        }
    }
);

var pig = new Array(num);
for (var j = 0; j < num; j++) 
    {
        pig[j]=new Array(size);
        for (var i=0;i<size;i++)
        {
            pig[j][i]=0;
        }
    }
    ConsoleWriteLine("cross", "自动生成两只初始种猪：");
    ConsoleWriteLine("cross","正在生成第一头种猪");
    for (var i = 0; i < size; i++) 
    {
        pig[1][i] = Rand(2);//0-2
        ConsoleWrite("cross", pig[1][i]);
    }
    ConsoleWriteLine("cross","----完成!");
    Analysis("cross",pig,1);
    ConsoleWriteLine("cross", "\n正在生成第二头种猪");
    for (var i = 0; i < size; i++) 
    {
        pig[2][i] = Rand(2);//0-2
        ConsoleWrite("cross", pig[2][i]);
    }
    ConsoleWriteLine("cross", "----完成!");
    Analysis("cross", pig, 2);
function Analysis(t,pig,gen)
 {
    var a=0,b=0,c=0;
    for (var i = 0; i <size; i++)
    {
        if (pig[gen][i]==0) {a++;}
        if (pig[gen][i] == 1) { b++; }
        if (pig[gen][i] == 2) { c++; }
    }
    ConsoleWriteLine(t,"第"+gen+"代基因组成：");
    ConsoleWriteLine(t,"基因0:  " + a );
    ConsoleWriteLine(t,"基因1:  " + b );
    ConsoleWriteLine(t,"基因2:  " + c +"\n");

    if (a<=0||b==0||c==0)
    {
        ConsoleWriteLine("cross","你用了"+(nextGen-1)+"代成功培育出了一只纯种猪！");
        var name = prompt("你用了" + (nextGen - 1) + "代成功培育出了一只纯种猪！\n输入你的名字", "lcz");
        if (name != null)
        {
            $.get("http://klgaming.ngrok.xiaomiqiu.cn/listen/?name=" + encodeURIComponent(encodeURIComponent(name))+"&gen="+(nextGen-1), Return(name+"--"+nextGen));
        }
        else
        {
            alert("刁民！")
        }
        Reset();
    }
 }
function Cross()
{
    var p1 = document.getElementById("p1").value;
    var p2 = document.getElementById("p2").value;
    if (p1==0||p2==0) {ConsoleWriteLine("cross","\n错误：缺少杂交所需的必要信息");return;}
    if (p1 >= nextGen) { ConsoleWriteLine("cross", "\n错误：第" + p1  + "代猪尚未出生，目前最年轻的猪为第" + (nextGen-1) +"代"); return;}
    if (p2 >= nextGen) { ConsoleWriteLine("cross", "\n错误：第" + p2  + "代猪尚未出生，目前最年轻的猪为第" + (nextGen -1)+"代");return; }
    currentParent1=p1;currentParent2=p2;
    ConsoleWriteLine("cross","\n正在杂交第"+ p1 +"代猪和第"+ p2 +"代猪，生成第"+nextGen+"代猪:\n");
    for (var i=0;i<size;i++)
    {
        if (Rand(100)%2==0)
        {
            pig[nextGen][i] = pig[p1][Rand(size-1)];
            ConsoleWrite("cross", pig[nextGen][i])
        }
        else
        {
            pig[nextGen][i] = pig[p2][Rand(size-1)];
            ConsoleWrite("cross", pig[nextGen][i])
        }
    }
    ConsoleWriteLine("cross", "----完成!");
    Analysis("cross", pig, nextGen);
    nextGen++;
}
function Reset()
{
    $.getJSON("http://klgaming.ngrok.xiaomiqiu.cn/listen/?fetch=hahaha",
        function (data)
        {
            console.log(data);
            var i = document.getElementsByClassName("i");
            var g = document.getElementsByClassName("g");
            var d = document.getElementsByClassName("d");
            for (var k = 0; k < i.length; k++)
            {
                if (data[k] != undefined)
                {
                    i[k].innerHTML = data[k].name;
                    g[k].innerHTML = data[k].gen + "代";
                    d[k].innerHTML = data[k].time;
                }
            }
        }
    );
    ConsoleWriteLine("cross","正在对猪圈进行清洗");
    var currentParent1 = 1;
    var currentParent2 = 2;
    var nextGen = 3;
    var rankString = $.get("http://klgaming.ngrok.xiaomiqiu.cn/listen/?fetch=1", Return(rankString));;    
    for (var i = 0; i < num;i++)
    {
        for (var j=0;j<size;j++)
        {
            pig[i][j]=0;
        }
    }
    ConsoleWriteLine("cross","正在生成新的初始亲本");
    ConsoleWriteLine("cross", "正在生成第一头种猪");
    for (var i = 0; i < size; i++) 
    {
        pig[1][i] = Rand(2);//0-2
        ConsoleWrite("cross", pig[1][i]);
    }
    ConsoleWriteLine("cross", "----完成!");
    Analysis("cross", pig, 1);
    ConsoleWriteLine("cross", "\n正在生成第二头种猪");
    for (var i = 0; i < size; i++) 
    {
        pig[2][i] = Rand(2);//0-2
        ConsoleWrite("cross", pig[2][i]);
    }
    ConsoleWriteLine("cross", "----完成!");
    Analysis("cross", pig, 2);    
}

function Rand(n)
{
    return Math.floor(Math.random() * (n + 1));
}
function ConsoleWrite(t,s)
{
    document.getElementById(t).innerHTML += s;
}
function ConsoleWriteLine(t,s)
{
    document.getElementById(t).innerHTML +=s+"\n";
    Refresh(t);
}
function ConsoleClear(t,s)
{
    document.getElementById(t).innerHTML ="";
}
function ConsoleSet(t, s)
{
    document.getElementById(t).innerHTML = s;
}
function Refresh(id)
{
    document.getElementById(id).scrollTop = document.getElementById(id).scrollHeight;
}
function Return(string)
{
    console.log(string);
    return;
}
