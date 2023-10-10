$(document).ready(function () {
   
    $(document).on("click", ".delete-button", function () {

        const jobBox = $(this).closest(".box");

        jobBox.remove();
    });

    
   
   
    $("#addJobButton").click(function () {
        $("#jobFormModal").css("display", "block");
    });

    $("#closeModal").click(function () {
        $("#jobFormModal").css("display", "none");
    });

    const selectedSkills = [];

    function filterJobsBySkills() {
        $(".box").each(function () {
            const jobSkills = $(this).find(".compartment:last-child button").map(function () {
                return $(this).text();
            }).get();

            if (selectedSkills.every(skill => jobSkills.includes(skill))) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    }

    $(".compartment:last-child button").click(function () {
        const skill = $(this).text();

        if (!selectedSkills.includes(skill)) {
            selectedSkills.push(skill);

            const filterButton = $("<button class='filter-button'></button>")
                .text(skill)
                .click(function () {
                    const index = selectedSkills.indexOf(skill);
                    if (index !== -1) {
                        selectedSkills.splice(index, 1);
                        $(this).remove();
                        filterJobsBySkills();
                    }
                });

            $("#skillFilters").append(filterButton);
        }

        filterJobsBySkills();
    });

    $("#clearFilters").click(function () {
        selectedSkills.length = 0;
        $("#skillFilters").empty();
        $(".box").show();
    });

    $("#jobForm").submit(function (e) {
        e.preventDefault();

        const companyName = $("#companyName").val();
        const designation = $("#designation").val();
        const imageUrl = $("#imageUrl").val();
        const skill1 = $("#skill1").val();
        const skill2 = $("#skill2").val();
        const skill3 = $("#skill3").val();
        const skill4 = $("#skill4").val();
        const skill5 = $("#skill5").val();

        const skillsArray = [skill1, skill2, skill3, skill4, skill5];
        const filteredSkills = skillsArray.filter(skill => skill.trim() !== "");

        const skillsButtons = filteredSkills.map(skill => `<button>${skill}</button>`).join(" ");

        if (!companyName || !designation || !imageUrl) {
            alert("Please fill out required fields.");
            return;
        }

        const newJobBox = `
            <div class="box new-job-box"> 

            <div class="delete-button-container">
        <button class="delete-button">Delete</button>
         </div>
                <div class="compartment">
                    <img src="${imageUrl}" alt="Image" class="job-image">
                </div>
                <div class="compartment vertical-content">
                    <div class="content">
                        <div class="compartment">
                            <div class="content">
                                <span style="color: #5CA5A5;"><b>${companyName}</b></span>
                            </div>
                            <div class="rounded-text rounded-new">New!</div>
                        </div>
                        <div class="content">
                            <p class="bold-text">${designation}</p>
                        </div>
                        <div class="content">
                            <span style="color: rgb(193, 193, 193);">1d ago&nbsp;.&nbsp;Full Time&nbsp;.&nbsp;Location</span>
                        </div>
                    </div>
                </div>
                <div class="compartment">
                    ${skillsButtons}
                </div>
            </div>
        `;

        $(".container").append(newJobBox);
        filterJobsBySkills();

        $("#jobFormModal").css("display", "none");

        $("#companyName").val("");
        $("#designation").val("");
        $("#imageUrl").val("");
        $("#skill1").val("");
        $("#skill2").val("");
        $("#skill3").val("");
        $("#skill4").val("");
        $("#skill5").val("");

         
    });
});