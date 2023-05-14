const form = document.getElementById("form_sentence");
if (form) {
    form.onsubmit = async function (e) {
        e.preventDefault();

        const formData = new FormData(form);
        
        let sentence = formData.get("sentence");
        if (sentence.length <= 8) {
            alertMessage("error", "Sentence too short to correct");
            return;
        }

        const response = await window.axios.openAI(formData.get("sentence"));
        document.getElementById("sentence_corrected").innerHTML = JSON.stringify(response.choices[0].text).replace(/\\n/g, '');
    };
}

function alertMessage(status, sentence){
    window.Toastify.showToast({
        text: sentence,
        duration: 3000,
        stopOnFocus: true,
        style: {
          background: status == "error" ? "red":"green",
          textAlign: "center",
          color: "white",
          padding: "5px",
          marginTop: "2px"
        }
      });
}