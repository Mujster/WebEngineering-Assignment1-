var filtertext;
var filters=[];
var i=0;
$(document).ready(function () {
    $.getJSON('data.json', function (jsonData) {
        container = $(".container");
        jsonData.forEach((job) => {
            div = $("<div>").addClass("card");
            div.attr('id', "delete-job-" + job.id);
            div.html(`
                <div class="logo"><img src="${job.logo}" alt="${job.company}"></div>
                <div class="details">
                    <h2 class="company">${job.company}</h2>
                    ${job.new ? '<h2 class="new-tag">New</h2>' : ''}
                    ${job.featured ? '<h2 class="feature-tag">Featured</h2>' : ''}
                    <div id="position" onclick="displayDetails(${job.description})"><h1 class="position">${job.position}</h1></div>
                    <p class="description">${job.postedAt} <span>&nbsp•&nbsp</span>${job.contract} <span>&nbsp•&nbsp</span>${job.location}</p> 
                </div>
                <div class="card-tags">
                   <button class="job" data-role="${job.role}" data-level="${job.level}" onclick="DisplayFilter(this)">${job.role}</button>
                   <button class="job" data-role="${job.role}" data-level="${job.level}" onclick="DisplayFilter(this)">${job.level}</button>
                    ${job.languages.map(language => `<button class="job" onclick="DisplayFilter()">${language}</button>`).join('')}
                    ${job.tools.map(tool => `<button class="job" onclick="DisplayFilter()">${tool}</button>`).join('')}
                </div>
                <button id="delete-job" onclick="DeleteJob('delete-job-' + ${job.id})">X</button>
            `);
            container.append(div);
        });
        container.on("click",".job",function(){
            filtertext=$(this).text();
            if($.inArray(filtertext,filters)===-1){
                filters.push(filtertext);
             }
            DisplayFilter();
        });
        container.on("click",".cancelbtn",function(){
            var temp=$(this).text();
            DeleteFilter(temp);
        });
    });
});
function displayDetails(description){
    $(".description-popup a").empty();
    $(".description-popup").css("display","flex");
    $(".description-popup").append('<a>'+description+'</a>');
}
function DescClose(){
    $(".description-popup").css("display","none");
    $(".description-popup").html('<h1>Job Description</h1><button id="close-btn" onclick="DescClose()">Close</button>');
}

function DisplayFilter(){
    $(".filter").css("display","flex");
    $(".active").empty();
    $(".card").each(function () {
        var temp = $(this);
        var check = temp.find(".job").map(function () {
            return $(this).text();
        }).get();

        if (filters.every(filtertext => check.includes(filtertext))) {
            temp.show();
        } else {
            temp.hide();
        }
    });
    $.each(filters,function(idx,filtertext){
        $(".active").prepend(`<h3 class="filter-tag" id="FilterTag-${filtertext}">`+filtertext+`<button class="cancelbtn" onclick="DeleteFilter('FilterTag-' + filtertext)" >X</button>`); 
    });
}
function HideFilter(){
    $(".filter").css("display","none");
    $(".card").show();
    $(".active").empty();
    filters=[];
}
function AddNewJob(){
    $(".popup").css("display","flex");
    //$(".container").css("opacity","40%");
}
function closePopup(){
    $(".popup").css("display","none");
    //$(".container").css("opacity","100%");
}
function submitJob(){
    var name = $("#company-name").val();
    var position = $("#job-position").val();
    var role = $("#job-role").val();
    var contract = $("select option:selected").val();
    var location=$("").val();
    var language = $("#input-languages").val();
    var img=$("#company-photo").get(0).files.length;
    var n=true,f=true;
    if (name === "" || position === "" || role === "" || contract === "0" || language === ""|| img===0||location==="") {
        alert("Please fill in all required fields.");
    }
    else {
        temp=$("<div>").addClass("card");
        temp.html(`<div class="logo"><img src="${img}" alt="${name}"></div>
        <div class="details">
            <h2 class="company">${name}</h2>
            ${n ? '<h2 class="new-tag">New</h2>' : ''}
            ${f ? '<h2 class="feature-tag">Featured</h2>' : ''}
            <h1 class="position">${position}</h1>
            <p class="description">1s ago<span>&nbsp•&nbsp</span>${contract} <span>&nbsp•&nbsp</span>${location}</p> 
        </div>
        <div class="card-tags">
           <button class="job" data-role="${role}" onclick="DisplayFilter(this)">${role}</button>
            ${language.split(',').map(languages => `<button class="job" onclick="DisplayFilter()">${languages}</button>`).join('')}
        </div>`);
        $(".container").prepend(temp);
        $(".popup").css("display","none");
    }
}

function display(position){
    alert("Hello");
}
function DeleteJob(id){
    var temp = $("#" + id);
    $(temp).css("display","none");
}
function DeleteFilter(id){
    var temp=$("#"+id);
    $(temp).css("display","none");
    $(".card").show();
}