const btnSallary = document.querySelector('.btn-sallary');
const btnBenefits = document.querySelector('.btn-benefits');

btnSallary.addEventListener('click', showSallary.bind());
btnBenefits.addEventListener('click', showBenefitsAsyncAwait.bind());

const urlCalculations = 'http://localhost:3000/calculations';
const urlBenefits = 'http://localhost:3000/benefits';

function showMassage(message) {
  alert(message)
}

function getDataFromBackend(url) {
  return fetch(url).then((res) => res.json())
}

function showSallary() {
  getDataFromBackend(urlCalculations)
    .then(calculations => calculateSallary(calculations))
    .then(
      sallary => showMassage(`your sallary is ${sallary}$ per month`),
      error => {
        alert(`Parametr error: ${error}`)
        throw error;
      }
    )
    .catch(error => alert(`Catch error: ${error}`))
    .finally(() => alert('Thank you, bye!'))
}

function calculateSallary(calculations) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      const sallary = calculations.workingHours * calculations.paymentPerHour;
      if (sallary > 3000) {
        res(sallary)
      } else {
        rej(new Error('Sorry, you have no access to this data'))
      }
    }, 3000)
  });;
}

function showBenefits() {
  Promise.all([getDataFromBackend(urlCalculations), getDataFromBackend(urlBenefits)])
    .then(([calculations, benefits]) => {
      calculateSallary(calculations)
        .then(sallary => showMassage(`Your total sallary is: ${sallary + benefits.premium}$`))
        .catch(error => alert(`Benefits error: ${error}`))
  })
}

async function showBenefitsAsyncAwait() {
  try {
    const [calculations, benefits] = await Promise.all([getDataFromBackend(urlCalculations), getDataFromBackend(urlBenefits)]);
    const sallary = await calculateSallary(calculations);
    showMassage(`Your total sallary is: ${sallary + benefits.premium}$`);
  } catch (error) {
    alert(`Async benefits error: ${error}`)
  }
}

