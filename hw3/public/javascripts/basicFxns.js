//Sarah Bunger

$(document).ready(function () {

    //helper functions ------------------------------------------------------------------------

    dropdownSelectionHandler = function() {
        //reference: https://stackoverflow.com/questions/43876827/hover-drop-down-button
        $("#drop")[0].innerHTML = this.innerHTML;
        console.log("dropdown selected!@@@@@@@@@@@@@@@@@@@@@@@@@@");
        console.log(this.innerHTML);
        var selectedMonth = this.innerHTML;
        
        $.post( "/orders",{month : selectedMonth},function( data, status, xhr ) {            
            console.log(selectedMonth);
            //update the bullets with the information from the JavaScript Object, which is NOT in JSON notation at this point
            $("#bullet1").text("Cherry: " + data["cherry"]);
            $("#bullet2").text("Plain: " + data["plain"]);
            $("#bullet3").text("Chocolate: " + data["chocolate"]);
        });

    }

    orderButtonClickHandler = function(){
        //obtain the value of the textbox
        var input = $("#input").val().toLowerCase();

        var n = input.search("enter any special instructions here.");
        if (n !== -1 || input == "") {
            input = "None."
        }

        if (input.includes("vegan")) {
            //use jQuery to show the alert
            alert("Oops! Cheesecake is not vegan!");
        }
        else {

            //obtaining values for use later in describing the order just placed
            var radioValue = $("input[name='topping']:checked").val();
            var dropdownValue = $("select option:selected").text();

            //removing the parts of the order form
            $("table").remove();
            $("div.notes_group").remove();
            $("input.order").remove();

            //creating text describing the order just placed

            $("img").after("<br> Notes: " + input + "<br>");

            if (radioValue == "plain") {
                $("img").after("Topping: plain")
            }
            else if (radioValue == "chocolate") {
                $("img").after("Topping: chocolate")
            }
            else {
                $("img").after("Topping: cherry")
            }

            $("img").after("Number ordered: " + dropdownValue + "<br>");
            $("img").after("Thank you! Your order has been placed. <br>");

            $.post( "/newOrder",{quantity : dropdownValue, topping : radioValue, notes : input},function( data, status, xhr ) {            
                console.log("here!");
                //console.log(data["notes"]);
            });
        }
    }

    //actual code, which uses the above event handlers --------------------------------------------
    $(function() {
        $("a").click(dropdownSelectionHandler);
        $("input.order").click(orderButtonClickHandler);
    });

    $(document).ajaxError(function(event, req, settings){
        console.log(event);
    });
});

