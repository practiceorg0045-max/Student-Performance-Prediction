// ==========================================
// STUDENT PERFORMANCE PREDICTION SYSTEM
// ==========================================


// Get form

const predictionForm =
    document.getElementById("predictionForm");


// ==========================================
// PREDICTION
// ==========================================

predictionForm.addEventListener("submit", function(event) {

    event.preventDefault();


    // -------------------------------
    // GET INPUT VALUES
    // -------------------------------

    const name =
        document.getElementById("studentName").value.trim();

    const studyHours =
        Number(document.getElementById("studyHours").value);

    const attendance =
        Number(document.getElementById("attendance").value);

    const previousMarks =
        Number(document.getElementById("previousMarks").value);

    const assignments =
        Number(document.getElementById("assignments").value);

    const sleepHours =
        Number(document.getElementById("sleepHours").value);

    const screenTime =
        Number(document.getElementById("screenTime").value);


    // ==================================
    // VALIDATION
    // ==================================

    if (
        studyHours < 0 ||
        attendance < 0 ||
        attendance > 100 ||
        previousMarks < 0 ||
        previousMarks > 100 ||
        assignments < 0 ||
        assignments > 100 ||
        sleepHours < 0 ||
        screenTime < 0
    ) {

        alert("Please enter valid values.");

        return;

    }


    // ==================================
    // CALCULATE STUDY SCORE
    // ==================================

    let studyScore =
        Math.min((studyHours / 8) * 100, 100);


    // ==================================
    // CALCULATE SLEEP SCORE
    // ==================================

    let sleepScore;


    if (
        sleepHours >= 7 &&
        sleepHours <= 9
    ) {

        sleepScore = 100;

    }

    else if (sleepHours >= 6) {

        sleepScore = 80;

    }

    else {

        sleepScore = 55;

    }


    // ==================================
    // CALCULATE SCREEN TIME SCORE
    // ==================================

    let screenScore;


    if (screenTime <= 3) {

        screenScore = 100;

    }

    else if (screenTime <= 5) {

        screenScore = 80;

    }

    else {

        screenScore = 55;

    }


    // ==================================
    // PERFORMANCE MODEL
    // ==================================

    /*
        Study Hours      = 20%
        Attendance       = 20%
        Previous Marks   = 25%
        Assignments      = 15%
        Sleep            = 10%
        Screen Time      = 10%
    */


    let score =

        (studyScore * 0.20) +

        (attendance * 0.20) +

        (previousMarks * 0.25) +

        (assignments * 0.15) +

        (sleepScore * 0.10) +

        (screenScore * 0.10);


    score = Math.round(score);


    // Keep score between 0 and 100

    score =
        Math.max(
            0,
            Math.min(100, score)
        );


    // ==================================
    // PERFORMANCE CATEGORY
    // ==================================

    let performance;

    let recommendation;


    if (score >= 90) {

        performance = "EXCELLENT";

        recommendation =
            "🌟 Excellent performance! Keep maintaining your current academic routine.";

    }

    else if (score >= 75) {

        performance = "GOOD";

        recommendation =
            "💡 Good performance. Increasing study hours slightly could improve the result.";

    }

    else if (score >= 50) {

        performance = "AVERAGE";

        recommendation =
            "💡 Try increasing study time, attendance and assignment completion.";

    }

    else {

        performance = "POOR";

        recommendation =
            "⚠️ Focus on attendance, regular study and completing assignments.";

    }


    // ==================================
    // SHOW RESULT
    // ==================================

    document
        .getElementById("emptyResult")
        .classList.add("hidden");


    document
        .getElementById("predictionResult")
        .classList.remove("hidden");


    document
        .getElementById("resultScore")
        .textContent =
        score + "%";


    document
        .getElementById("resultStatus")
        .textContent =
        performance;


    document
        .getElementById("resultProgress")
        .style.width =
        score + "%";


    document
        .getElementById("resultMessage")
        .textContent =
        `${name}'s estimated academic performance is ${score}%.`;


    document
        .getElementById("recommendation")
        .textContent =
        recommendation;


    // ==================================
    // UPDATE ANALYSIS
    // ==================================

    updateAnalysis(
        score,
        studyScore,
        attendance,
        previousMarks,
        assignments,
        sleepScore
    );


    // ==================================
    // SAVE DATA
    // ==================================

    let history =
        JSON.parse(
            localStorage.getItem("studentHistory")
        ) || [];


    const prediction = {

        name: name,

        score: score,

        performance: performance,

        date:
            new Date().toLocaleDateString(),

        studyHours: studyHours,

        attendance: attendance,

        previousMarks: previousMarks,

        assignments: assignments,

        sleepHours: sleepHours,

        screenTime: screenTime

    };


    history.unshift(prediction);


    localStorage.setItem(
        "studentHistory",
        JSON.stringify(history)
    );


    // Update dashboard

    updateDashboard();


    // Update history

    loadHistory();


    // Scroll to result

    document
        .getElementById("prediction")
        .scrollIntoView({
            behavior: "smooth"
        });

});



// ==========================================
// ANALYSIS
// ==========================================

function updateAnalysis(
    score,
    study,
    attendance,
    marks,
    assignments,
    sleep
) {


    document.getElementById(
        "analysisScore"
    ).textContent =
        score + "%";


    // Study

    document.getElementById(
        "studyFactor"
    ).textContent =
        Math.round(study) + "%";


    document.getElementById(
        "studyFactorBar"
    ).style.width =
        study + "%";


    // Attendance

    document.getElementById(
        "attendanceFactor"
    ).textContent =
        attendance + "%";


    document.getElementById(
        "attendanceFactorBar"
    ).style.width =
        attendance + "%";


    // Previous marks

    document.getElementById(
        "marksFactor"
    ).textContent =
        marks + "%";


    document.getElementById(
        "marksFactorBar"
    ).style.width =
        marks + "%";


    // Assignments

    document.getElementById(
        "assignmentFactor"
    ).textContent =
        assignments + "%";


    document.getElementById(
        "assignmentFactorBar"
    ).style.width =
        assignments + "%";


    // Sleep

    document.getElementById(
        "sleepFactor"
    ).textContent =
        Math.round(sleep) + "%";


    document.getElementById(
        "sleepFactorBar"
    ).style.width =
        sleep + "%";


    // ==================================
    // STRENGTHS
    // ==================================

    const strengths =
        document.getElementById(
            "strengthList"
        );


    strengths.innerHTML = "";


    if (attendance >= 80) {

        strengths.innerHTML +=
            "<li>✓ Good attendance</li>";

    }

    if (assignments >= 80) {

        strengths.innerHTML +=
            "<li>✓ Strong assignment completion</li>";

    }

    if (sleep >= 80) {

        strengths.innerHTML +=
            "<li>✓ Healthy sleep routine</li>";

    }

    if (strengths.innerHTML === "") {

        strengths.innerHTML =
            "<li>• Keep working to build stronger habits.</li>";

    }


    // ==================================
    // IMPROVEMENTS
    // ==================================

    const improvements =
        document.getElementById(
            "improvementList"
        );


    improvements.innerHTML = "";


    if (study < 75) {

        improvements.innerHTML +=
            "<li>→ Increase study hours</li>";

    }

    if (attendance < 80) {

        improvements.innerHTML +=
            "<li>→ Improve attendance</li>";

    }

    if (marks < 70) {

        improvements.innerHTML +=
            "<li>→ Improve previous marks</li>";

    }

    if (assignments < 80) {

        improvements.innerHTML +=
            "<li>→ Complete more assignments</li>";

    }

    if (improvements.innerHTML === "") {

        improvements.innerHTML =
            "<li>→ Maintain your current consistency.</li>";

    }

}



// ==========================================
// LOAD HISTORY
// ==========================================

function loadHistory() {


    const table =
        document.getElementById(
            "historyTable"
        );


    const noHistory =
        document.getElementById(
            "noHistory"
        );


    const history =
        JSON.parse(
            localStorage.getItem(
                "studentHistory"
            )
        ) || [];


    table.innerHTML = "";


    if (history.length === 0) {

        noHistory.style.display =
            "block";

        return;

    }


    noHistory.style.display =
        "none";


    history.forEach(function(student) {


        const row =
            document.createElement("tr");


        let statusClass =
            "average";


        if (
            student.performance ===
            "EXCELLENT"
        ) {

            statusClass =
                "excellent";

        }

        else if (
            student.performance ===
            "GOOD"
        ) {

            statusClass =
                "good";

        }

        else if (
            student.performance ===
            "POOR"
        ) {

            statusClass =
                "poor";

        }


        row.innerHTML = `

            <td>
                <strong>
                    ${student.name}
                </strong>
            </td>

            <td>
                <strong>
                    ${student.score}%
                </strong>
            </td>

            <td>
                <span class="status ${statusClass}">
                    ${student.performance}
                </span>
            </td>

            <td>
                ${student.date}
            </td>

        `;


        table.appendChild(row);

    });

}



// ==========================================
// DASHBOARD
// ==========================================

function updateDashboard() {


    const history =
        JSON.parse(
            localStorage.getItem(
                "studentHistory"
            )
        ) || [];


    const total =
        history.length;


    document.getElementById(
        "studentCount"
    ).textContent =
        total;


    if (total === 0) {

        document.getElementById(
            "averageScore"
        ).textContent =
            "0%";


        document.getElementById(
            "highestScore"
        ).textContent =
            "0%";


        document.getElementById(
            "goodStudents"
        ).textContent =
            "0";


        return;

    }


    // ==================================
    // AVERAGE SCORE
    // ==================================

    let totalScore = 0;

    let highest = 0;

    let goodCount = 0;


    let excellent = 0;

    let good = 0;

    let average = 0;

    let poor = 0;


    history.forEach(function(student) {


        totalScore +=
            student.score;


        if (student.score > highest) {

            highest =
                student.score;

        }


        if (
            student.performance ===
            "EXCELLENT"
        ) {

            excellent++;

            goodCount++;

        }

        else if (
            student.performance ===
            "GOOD"
        ) {

            good++;

            goodCount++;

        }

        else if (
            student.performance ===
            "AVERAGE"
        ) {

            average++;

        }

        else {

            poor++;

        }

    });


    const averageScore =
        Math.round(
            totalScore / total
        );


    document.getElementById(
        "averageScore"
    ).textContent =
        averageScore + "%";


    document.getElementById(
        "highestScore"
    ).textContent =
        highest + "%";


    document.getElementById(
        "goodStudents"
    ).textContent =
        goodCount;



    // ==================================
    // PERCENTAGES
    // ==================================

    const excellentPercent =
        Math.round(
            (excellent / total) * 100
        );


    const goodPercent =
        Math.round(
            (good / total) * 100
        );


    const averagePercent =
        Math.round(
            (average / total) * 100
        );


    const poorPercent =
        Math.round(
            (poor / total) * 100
        );


    // Excellent

    document.getElementById(
        "excellentPercent"
    ).textContent =
        excellentPercent + "%";


    document.getElementById(
        "excellentBar"
    ).style.width =
        excellentPercent + "%";


    // Good

    document.getElementById(
        "goodPercent"
    ).textContent =
        goodPercent + "%";


    document.getElementById(
        "goodBar"
    ).style.width =
        goodPercent + "%";


    // Average

    document.getElementById(
        "averagePercent"
    ).textContent =
        averagePercent + "%";


    document.getElementById(
        "averageBar"
    ).style.width =
        averagePercent + "%";


    // Poor

    document.getElementById(
        "poorPercent"
    ).textContent =
        poorPercent + "%";


    document.getElementById(
        "poorBar"
    ).style.width =
        poorPercent + "%";

}



// ==========================================
// CLEAR HISTORY
// ==========================================

function clearHistory() {


    const confirmation =
        confirm(
            "Are you sure you want to clear all prediction history?"
        );


    if (confirmation) {

        localStorage.removeItem(
            "studentHistory"
        );


        loadHistory();

        updateDashboard();

    }

}



// ==========================================
// INITIAL LOAD
// ==========================================

loadHistory();

updateDashboard();