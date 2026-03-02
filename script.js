const scriptURL = "https://script.google.com/macros/s/AKfycbxtNmu-hVyTUenc-g0WblF_Bw4vfd78_cafoti6aeATilLavF64OCND-yFZtRm44Bmc/exec";

const form = document.getElementById("leadForm");
const phoneInput = document.querySelector('input[name="phone"]');
const submitBtn = form.querySelector("button[type='submit']");

let isSubmitting = false;

/* Limit phone to 10 digits */
phoneInput.addEventListener("input", function () {
  this.value = this.value.replace(/\D/g, '').slice(0,10);
});

form.addEventListener("submit", function(e){

  e.preventDefault();

  if (isSubmitting) return;

  isSubmitting = true;

  submitBtn.disabled = true;
  submitBtn.innerText = "Submitting...";

  const formData = new FormData(form);

  const data = {
    name: formData.get("name"),
    phone: formData.get("phone"),
    project: formData.get("project"),
    homeType: formData.get("homeType"),
    budget: formData.get("budget"),
    closure: formData.get("closure"),
    message: formData.get("message")
  };

  fetch(scriptURL,{
    method:"POST",
    mode:"no-cors",
    body: JSON.stringify(data)
  })
  .then(()=>{

    form.reset();

    submitBtn.innerText = "Submitted";

    setTimeout(()=>{
      submitBtn.disabled = false;
      submitBtn.innerText = "Submit Inquiry";
      isSubmitting = false;
    },3000);

  })
  .catch(()=>{

    submitBtn.disabled = false;
    submitBtn.innerText = "Submit Inquiry";
    isSubmitting = false;

  });

});