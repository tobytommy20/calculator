"use strict"

const gradeMap = { A: 5, B: 4, C: 3, D: 2, E: 1, F: 0 };


function calculateCGPA() {
  const gradeInputs = document.querySelectorAll(".grade .input");
  const unitInputs = document.querySelectorAll(".units .input");
  const resultDisplay = getResultDisplay();

  let totalPoints = 0;
  let totalUnits = 0;

  for (let i = 0; i < gradeInputs.length; i++) {
    const gradeVal = gradeInputs[i].value.trim().toUpperCase();
    const unitVal = parseFloat(unitInputs[i].value);

    if (!gradeVal || isNaN(unitVal) || unitVal <= 0) continue;

    const gradePoint = gradeMap[gradeVal] ?? parseFloat(gradeVal);

    if (isNaN(gradePoint)) {
      resultDisplay.textContent = `⚠️ Invalid grade at course ${
        i + 1
      }: "${gradeVal}"`;
      resultDisplay.style.color = "red";
      return;
    }

    totalPoints += gradePoint * unitVal;
    totalUnits += unitVal;
  }

  if (totalUnits === 0) {
    resultDisplay.textContent =
      "⚠️ Please fill in at least one valid grade and unit.";
    resultDisplay.style.color = "red";
    return;
  }

  const cgpa = (totalPoints / totalUnits).toFixed(2);
  resultDisplay.textContent = `🎓 Your CGPA is: ${cgpa}`;
  resultDisplay.style.color = "green";
}

function addCourseRow() {
  const courseDiv = document.querySelector(".course");
  const gradeDiv = document.querySelector(".grade");
  const unitDiv = document.querySelector(".units");

  const newCourse = document.createElement("input");
  newCourse.type = "text";
  newCourse.className = "name";
  newCourse.placeholder = "e.g MTS101";

  const newGrade = document.createElement("input");
  newGrade.type = "text";
  newGrade.className = "input";
  newGrade.placeholder = "A=5,B=4...";

  const newUnit = document.createElement("input");
  newUnit.type = "number";
  newUnit.className = "input";

  courseDiv.appendChild(newCourse);
  gradeDiv.appendChild(newGrade);
  unitDiv.appendChild(newUnit);
}

function clearAll() {
  document.querySelectorAll("input").forEach((input) => (input.value = ""));
  const resultDisplay = document.querySelector("#cgpaResult");
  if (resultDisplay) resultDisplay.textContent = "";
}

function getResultDisplay() {
  let result = document.querySelector("#cgpaResult");
  if (!result) {
    result = document.createElement("p");
    result.id = "cgpaResult";
    result.style.marginTop = "10px";
    result.style.textAlign = "center";
    result.style.fontWeight = "bold";
    document.querySelector(".calculate").appendChild(result);
  }
  return result;
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".blue").addEventListener("click", calculateCGPA);
  document.querySelector(".green").addEventListener("click", addCourseRow);
  document.querySelector(".red").addEventListener("click", clearAll);
});
