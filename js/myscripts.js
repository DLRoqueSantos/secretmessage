let formChecker = (function(){

    function numbersOnly(testStr){
        let numCheck = /^[0-9]+$/
        if(numCheck.test(testStr)){
            return true;
        }
        return false;
    }

    function charsOnlyTest(testStr){
        let nameCheck = /^[a-zA-z]+$/;
        if(nameCheck.test(testStr)){
            return true;
        }
        return false;
    }

    function postalCodeTest(testStr){
        let postalCheck = /^[a-zA-Z]{1}[0-9]{1}[a-zA-Z]{1}[ ]?[0-9]{1}[a-zA-Z]{1}[0-9]{1}$/
        if(postalCheck.test(testStr)){
            return true;
        }
        return false;
    }

    function phoneNrTest(testStr){
        let phoneCheck = /^[0-9]{3}[-]{1}?[0-9]{3}[-]{1}?[0-9]{4}$/

        if(phoneCheck.test(testStr)){
            return true;
        }
        return false;
    }

    function emailCheckTest(testStr){
        let emailCheck = /^[a-zA-Z0-9._-]+?[@][a-zA-Z0-9]+?[.][a-zA-Z0-9]+$/
        if(emailCheck.test(testStr)){
            return true;
        }
        return false;
    }

    function cityCheckTest(testStr){
        let cityCheck = /^(Toronto)|(toronto)$/
        if(cityCheck.test(testStr)){
            return true;
        }
        return false;
    }

    function hasValue(testStr){
        if(testStr!=null && testStr.length>=1){
            return true;
        }
        return false;
    }

    function radioCheckedValue(checkName){
        if(event.target.querySelector(`input[name=${checkName}]:checked`)){
            return event.target.querySelector(`input[name=${checkName}]:checked`).value;
        }
            return null;
    }

    function errorsCheck(valuesList){
        let errors=[];
            valuesList.forEach((item) => {
                if((item.func)(item.val)==false){
                    errors.push(`<p>${item.errMsg}</p>`);
                }
            });
        return errors;
    }

    function canSubmit(errorsList){
        if(errorsList.length>0){
            showErrors(errorsList);
            return false;
        }
        return true;
    }

    function showErrors(errorsList){
        let errorDisplay = event.target.querySelector("#errors");
        errorDisplay.innerHTML=errorsList.join('');
        /** Shows and scrolls to errors section **/
        document.getElementById("errors").style.display = "block";
        document.getElementById("errors").scrollIntoView({
          behavior: 'smooth'
        });
    }

    function checkForm(event){
        event.preventDefault();
        //
        let submitValues = {};
        submitValues.first_name = event.target.querySelector("#firstname").value;
        submitValues.last_name = event.target.querySelector("#lastname").value;
        submitValues.email = event.target.querySelector("#email").value;
        submitValues.phone = event.target.querySelector("#phone").value;
        submitValues.city = event.target.querySelector("#city").value;
        submitValues.postal_code = event.target.querySelector("#postalcode").value;
        submitValues.province = event.target.querySelector("select[name=province]").value;
        submitValues.referred  = event.target.querySelector("select[name=referred]").value;
        submitValues.details_textarea  = event.target.querySelector("#details_textarea").value;
        submitValues.project_type = radioCheckedValue('project_type');
        // https://www.debuggex.com/cheatsheet/regex/javascript

        let errorsList = errorsCheck(
            [
                {val:submitValues.first_name, func:charsOnlyTest, errMsg:"Please enter your <b>first name</b>."},
                {val:submitValues.last_name, func:charsOnlyTest, errMsg:"Please enter your <b>last name</b>."},
                {val:submitValues.email, func:emailCheckTest, errMsg:"Please enter a <b>valid email</b>."},
                {val:submitValues.phone, func:phoneNrTest, errMsg:"Please enter a <b>valid phone number</b> (Use dashes e.g.: 416-123-1234)."},
                {val:submitValues.city, func:charsOnlyTest, errMsg:"Please select your <b>City</b>."},
                {val:submitValues.postal_code, func:postalCodeTest, errMsg:"Please enter a valid <b>postal code</b>."},
                {val:submitValues.province, func:hasValue, errMsg:"Please select a <b>province</b>."},
                {val:submitValues.referred, func:hasValue, errMsg:"Please choose where you found us or <b>referred</b>."},
                {val:submitValues.project_type, func:hasValue, errMsg:"Please select the <b>type of project</b> you are requesting a quote on."},
                {val:submitValues.details_textarea, func:hasValue, errMsg:"Please tell <b>what you have in mind</b> for this project."}
            ]);

        if(canSubmit(errorsList)){
            console.log("I am ready for submit");
            console.table(submitValues);
            event.target.reset();
            alert("Your quote has been sent! \n We will contact you soon.");
            document.getElementById("errors").style.display = "none";
            document.getElementById("wd_rate").style.display = "none";
            document.getElementById("gd_rate").style.display = "none";
            document.getElementById("gd_rate").style.display = "none";
        }

        /** If the regex of the city typed is true this secret message appears **/
        let cityTyped = event.target.querySelector("#city").value;
                console.log(cityTyped);
        if(cityCheckTest(cityTyped)){
            document.querySelector("#toronto_match").style.display = "block";
        }else {
            document.querySelector("#toronto_match").style.display = "none";
        }

    }
    return {
        initForm: function(userForm){
            userForm.addEventListener("submit", checkForm);
        }
    }
})();

/** Checks when the user clicks the radio buttons and shows the secret message **/
function hourlyMessage(e){
  console.log(`Type of project selected: ${e.value}`);
  if (e.value == "WD") {
    document.getElementById("wd_rate").style.display = "block";
    document.getElementById("gd_rate").style.display = "none";
    document.getElementById("gd_rate").style.display = "none";
  }else if (e.value == "GD") {
    document.getElementById("wd_rate").style.display = "none";
    document.getElementById("gd_rate").style.display = "block";
    document.getElementById("pv_rate").style.display = "none";
  }else if (e.value == "PV") {
    document.getElementById("wd_rate").style.display = "none";
    document.getElementById("gd_rate").style.display = "none";
    document.getElementById("pv_rate").style.display = "block";
  }
}
