function calculateBMI() {
    const height = parseFloat(document.getElementById('heightInput').value);
    const weight = parseFloat(document.getElementById('weightInput').value);
    const resultElement = document.getElementById('result');

    if (!height || !weight) {
        resultElement.textContent = 'Please enter valid height and weight!';
        return;
    }

    const bmi = (weight / (height * height)).toFixed(2);

    let message = `Your BMI is ${bmi}. `;
    if (bmi < 18.5) {
        message += 'You are underweight.';
    } else if (bmi >= 18.5 && bmi < 24.9) {
        message += 'You have a normal weight.';
    } else if (bmi >= 25 && bmi < 29.9) {
        message += 'You are overweight.';
    } else {
        message += 'You are obese.';
    }

    resultElement.textContent = message;
}
