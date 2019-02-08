$(document).ready(function(){

    var topics =[
        "BMW",
        "Audi",
        "Ford",
        "Lexus",
        "Alfa Romeo",
        "Mazda",
        "Acura",
        "Porsche",
        "Lamborghini",
        "Ferrari"
    ];

    function carMakesDisplay(){

            var cars = $(this).attr("data-cars");
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + 
            cars + "&api_key=8kw4MCNWuysYgsDKJH3JhYX2OibOYXa8&limit=10";
        console.log("this is: ", cars)

        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function(response){
                $("#gifsHere").empty();

                var results = response.data;
                console.log(response);

                for (var i = 0; i < results.length; i++){
                    var gifDiv = $("<div>");

                    var rating = results[i].rating;

                    var p = $("<p>").text("Rating: " + rating);

                    var carImage = $("<img>");
                    carImage.attr("src", results[i].images.fixed_height_still.url);
                    
                    carImage.attr("data-still", results[i].images.fixed_height_still.url);

                    carImage.attr("data-animate", results[i].images.fixed_height.url);

                    carImage.attr("data-state", "still");

                    carImage.addClass("carImage");

                    gifDiv.prepend(p);

                    gifDiv.prepend(carImage);

                    $("#gifsHere").prepend(gifDiv);
                }


                $(".carImage").on("click", function(){
                    var state = $(this).attr("data-state");
                    console.log(state);

                    if(state === "still"){
                        $(this).attr("src", $(this).attr("data-animate"));
                        $(this).attr("data-state", "animate");
                    }
                    else {
                        $(this).attr("src", $(this).attr("data-still"));
                        $(this).attr("data-state", "still");
                    }
                  
                });
            });
        }

        function carButtons(){
            $("#buttonsWrapper").empty();

            for (var i = 0; i < topics.length; i++){
                var buttons = $("<button>");

                buttons.addClass("cars");

                buttons.attr("data-cars", topics[i]);

                buttons.text(topics[i]);

                $("#buttonsWrapper").append(buttons);
                    
            }
        }

        $("#carMakesSubmit").on("click", function(event){
            event.preventDefault();

            var cars = $("#carMakes").val().trim();

            topics.push(cars);
            
            carButtons();
        });

         // carMakesDisplay();
        $(document).on("click", ".cars", carMakesDisplay);

        carButtons();
    
});